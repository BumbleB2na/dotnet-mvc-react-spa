# ASP.NET Core MVC with React

ASP.NET Core 2.2 MVC web application with a View that contains a React Typescript component.


## steps to build 

Run the project from Visual Studio.


## testing

To test React components: Navigate to React SPA folder via command line then run: ```npm run test```


## history of project creation

Had considered different ways to bring in React.js to an ASP.NET Core MVC web application and there are a lot of options that really come down to architecture. The most common method is to allow React.js to work as a Single Page Application (SPA). In the context of a .Net MVC web application the components of a React SPA are the Views and routing is handled by react-routing instead of by .Net. It is easiest to begin with Visual Studio's React.js project template which uses Create React App under the hood, and although you get .Net Core 3.0 Razor Pages by default you can immediately start adding Models and Controllers.

1. Used Visual Studio to create new ASP.NET Core 3.1 project, "DotNetMVC" using React.js project template with no authentication.
1. Manually added in MVC components since not beginning with ASP.NET Core Web Application (Model-View-Controller) project template:
   - There is no Views folder because, React SPA is the View. 
   - There is a Controllers folder containing api controllers for the React SPA to fetch. 
   - There are Models and ViewModels folders like in a traditional .Net Core MVC web application because, MVC gives us stronger separation of concerns within the backend.
