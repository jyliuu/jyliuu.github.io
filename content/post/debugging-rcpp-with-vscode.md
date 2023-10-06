+++
date = "2023-10-06"
title = "Debugging Rcpp with VSCode"
slug = "debugging-rcpp-vscode"
categories = [ "Post" ]
tags = [ "Rcpp", "software development", "statistics"]
readingtime = false
headline = "a tutorial and reference"
hideauthor = true
+++

## Preface 

The following post details the process of connecting the VSCode debugger with Rcpp, it is a compilation from the following sources:
1. [Using VS Code to Debug R Packages with C or C++ Code](https://blog.davisvaughan.com/posts/2022-03-11-using-vs-code-to-debug-r-packages-with-c-code/)
2. [vscode-rcpp-demo (GitHub repo)](https://github.com/renkun-ken/vscode-rcpp-demo/tree/master)
3. [R packages documentation](https://r-pkgs.org/dependencies-in-practice.html#sec-dependencies-in-imports)

I am running on a MacBook Pro with the M2 Pro chip, my R version is 4.3.1 and is installed via Homebrew.  

## Step 0: Installing necessary R packages
1. [vscDebugger](https://github.com/ManuelHentschel/vscDebugger): An R language connector that connects to the VSCode debugger, for R code only
2. [devtools](https://devtools.r-lib.org/): Necessary for building the R package
3. [usethis](https://github.com/r-lib/usethis): For setting up the package skeleton
4. [testhat](https://github.com/r-lib/testthat): For creating unit-tests

## Step 1: Getting VSCode to work with C++

Install VSCode if you haven't already, and add the following extensions as detailed by Davis Vaughan in the first post above
1. [C/C++ Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-extension-pack)
2. [R extension](https://marketplace.visualstudio.com/items?itemName=Ikuyadeu.r)
3. [CodeLLB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb)

CodeLLB is the debugger that we will connect to Rcpp for debugging.

## Step 2: Creating an R package
I have not been able to avoid this step. Usually for simple applications usually you would just have an .r file and a .cpp file, and in the .r file you might call 
```r
library(Rcpp)
sourceCpp('my-rcpp-implementation.cpp')

# declare variables
... 

cpp_impl(x, y, z)
```
But it seems that it is not possible to hook LLDB to the R session directly to debug the C++ code (perhaps there is an easy way of doing this, by linking the compiled object to LLDB, see [this post](https://stackoverflow.com/questions/36968721/lldb-not-showing-source-code)). 

To debug the C++ code it is necessary to contain it in an R package, which can be created in the following ways:
1. Clone the repo from the second link 
2. Create one using RStudio (File -> New project -> New directory -> R package with Rcpp)
3. Using `usethis::create_package` (See the documentation on GitHub)

Once the R package has been created, you can move your source files to the package as follows:
1. R files -> `R/` directory
2. C++ files -> `src/` directory 

## Step 3: Setting up the C++ configuration in VSCode
We will now connect the VSCode debugger so that we can debug the Rcpp code. Depending on your operating system and R installation this step will not be exactly the same. So please do not blindly copy-paste what I write here. 

First of all, we need to add the R/Rcpp header files to `.vscode/c_cpp_properties.json` so that the C/C++ extension can find them. By hitting `Cmd+Shift+P` in VSCode and typing 'edit configurations' the first dropdown option should look like 

![dropdown](/img/debugging-rcpp-vscode/dropdown.png "Dropdown")

Select either (UI) or (JSON), after selecting (JSON) a file will be opened with the following contents:
```json
{
    "configurations": [
        {
            "name": "Mac",
            "defines": [],
            "macFrameworkPath": [
                "/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks"
            ],
            "compilerPath": "/usr/bin/clang",
            "cStandard": "c17",
            "cppStandard": "c++17",
            "intelliSenseMode": "macos-clang-arm64"
        }
    ],
    "version": 4
}
```
In the innermost dictionary we will add the include paths for the R/Rcpp header files:
```json
{
    ...
    "includePath": [
        "${workspaceFolder}/**", 
        "/opt/homebrew/lib/R/4.3/site-library/Rcpp/include/*", 
        "/opt/homebrew/lib/R/include/*"
    ]
    ...
}
```
Your include paths might be different, in which case you need to determine the location of your R installation and from there the paths accordingly. Essentially, you need to find the directories containing the `Rcpp.h` and `R.h` files. You can do so by opening the R console and typing:
```r
R.home("include") # Returns the directory that contains R.h
.libPaths() # Returns directories containing the headers for other packages, you will have to traverse this and find the Rcpp directory 
```
In order for devtools to compile the exported functions, it might be necessary to create a `Makevars` file in the `src/` directory and add the following line
```
PKG_CPPFLAGS = -I/opt/homebrew/lib/R/4.3/site-library/Rcpp/include
```
Replace the path above with the location of your Rcpp header files. 

## Step 4: Exporting Rcpp functions (`NAMESPACE`)
The `NAMESPACE` file resides at the root of the package, and specifies the package exports. Getting the `NAMESPACE` right is crucial for connecting the debugger, you can either modify it manually or use roxygen2 to generate it. The `devtools::` functions use roxygen2, and is also what I would recommend doing.

### Manually
To do it manually you can add the following lines to the file:
```r
useDynLib(pkgname, .registration=TRUE) # Replace with your package name
importFrom(Rcpp, evalCpp)
exportPattern("^[[:alpha:]]+")
```
The code above will export all functions from the package whose names start with one or more alphabetic characters.  

### Using roxygen2 (Recommended) 
To use roxygen2 first add the C++ files to the `src/` directory. Once they have been added, annotate the functions that you want to export with these two lines:
```cpp
//' @export
// [[Rcpp::export]]
```
The first line tells roxygen2 that the function should be included in `NAMESPACE` when it is generated, while the second line specifies the Rcpp export. For example, a C++ file could look like:
```cpp
#include <Rcpp.h>
#include <random>
using namespace Rcpp;

//' @export
// [[Rcpp::export]]
NumericVector f_dens_cpp_1(const NumericVector& y, 
                             const NumericVector& x,
                             const NumericVector& z){
  NumericVector ret(y.length());
  for (int i = 0; i < y.length(); i++){
    double ans = 1;
    for (int j = 0; j < x.length(); j++){
      ans *= exp(y[i] * z[j] * x[j] - exp(y[i]*x[j]));
    }
    ret[i] = ans;
  }
  return ret;
}
```
You can also find another example from `vscode-rcpp-demo` in the second link above. 

After you have annotated the exported the functions, run 
```r
Rcpp::compileAttributes()
```
in an R console opened from the package root. The command will generate an `RcppExports.R` file in the `R/` directory.

We now create a `pkgname-package.R` file in the `R/` directory via the following command
```r
usethis::use_package_doc()
```
Which should result in a file with:
```r
#' @keywords internal
"_PACKAGE"

## usethis namespace: start
## usethis namespace: end
NULL
```
You can then add the following two lines to the newly created package documentation:
```r
#' @keywords internal
"_PACKAGE"

## usethis namespace: start
#' @importFrom Rcpp evalCpp
#' @useDynLib pkgname, .registration=TRUE 
## usethis namespace: end
NULL
```
In the line starting with `@useDynLib` replace `pkgname` with the name of your package (first line in DESCRIPTION). 

Generate the `NAMESPACE` now by executing:
```r
devtools::document()
```

## Step 5: Creating a unit-test to debug
Creating unit-tests is a good practice in general. Unit-tests are concise and standalone pieces of code that can be ran individually, which makes them great for debugging small individual functions -- as is frequently the case programming in R. 

Run the following commands in the package root:
```
usethis::use_testthat()
usethis::use_test('my-test')
```
A directory `testthat/` will be created with the new test. In it you can call your Rcpp functions, for example
```r
# Under tests/testthat/test-my-test.R

test_that("Density works", {
  dat <- read.csv('2_Poisson.csv')
  z <- dat$z
  x <- dat$x

  step_size <- 0.01
  res <- seq(0, 1, step_size)
  
  # f_dens_cpp_1 is an Rcpp function
  expect_equal(f_dens_cpp_1(res, x, z), c(0, 1, 2)) # Assert statement 
})
```
Note that we do not have to import the functions that we are calling, because when we later run tests by calling `devtools::test()`, the package `devtools` will import the necessary functions specified in the `NAMESPACE` automatically.

## Step 6: Setting up the launch configuration in VSCode
The `.vscode` directory should hopefully be created by now in the package root. In there you will add a new file, `launch.json` with the following contents:
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "(lldb) Launch",
            "type": "lldb",
            "request": "launch",
            "program": "/opt/homebrew/Cellar/r/4.3.1/lib/R/bin/exec/R",
            "args": [
              "--vanilla",
              "-e",
              "devtools::test()"
            ],
            "env": {
              "R_HOME" : "/opt/homebrew/Cellar/r/4.3.1/lib/R"
            },
            "terminal": "console",
            "stopOnEntry": false
        },
    ]
}
```
There might already exist R debugging configurations, in which case append the above configuration to the existing configurations list. There are two things that we have to look out for, which are the `"program"` and `"R_HOME"` fields. 

You can find your `R_HOME` by executing `R.home()` in an R console. The R program is usually found as `$R_HOME/bin/exec/R`, make sure that you have the R **binary** and not the execution script. Doing `which R` will only give you the execution script and not the binary! 

## Step 7: Debugging the C++ code  
Navigate now to the C++ code in `src/`, you should be able to click left to the line number to set a breakpoint 
![breakpoint](/img/debugging-rcpp-vscode/breakpoint.png "Breakpoint")

Click on the debugger tab to the left, you should now see a green button on the top next to the launch configuration, clicking that will start the debugging session

![debugview](/img/debugging-rcpp-vscode/debugview.png "Debugging View")

Once the C++ function has been called, the debugger will break on the breakpoint and it is now possible to inspect variables in the runtime environment

![debugsession](/img/debugging-rcpp-vscode/debugsession.png "Debugging Session")

The debug console on the bottom panel can also be used, here you can to send commands to LLDB to inspect different variables. 


## Final remarks 
In this tutorial I have demonstrated a working setup for debugging Rcpp using VSCode. One thing that I haven't mentioned is how to add the include paths for all projects in VSCode globally. This dissolves the need of creating the `c_cpp_properties.json` file everytime in each new project. One can execute `Cmd+Shift+P` and then type "user settings", open that as JSON and paste in the following:
```json
{
    ...
    "C_Cpp.default.includePath": [
        "/opt/homebrew/lib/R/4.3/site-library/Rcpp/include/*", 
        "/opt/homebrew/lib/R/include/*"
    ],
    ...
}
```
This will add the R/Rcpp include paths to all future projects. 


