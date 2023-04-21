### What is the difference between Component and PureComponent? give an example where it might break my app.

The main difference between `React.Component` and `React.PureComponent` is than PureComponent has already implemented `shouldComponentUpdate` method. 
It performs a shallow comparison of props and state. If the comparison results in no changes, the PureComponent will not re-render, which can improve performance. However, if the comparison is not implemented correctly, it can break the app by preventing necessary updates to the component.

An example where a PureComponent might break the app is when the props or state contain complex objects or arrays. Since PureComponent only does a shallow comparison, it may not detect changes in the deep nested properties of the object, leading to unexpected behavior because of skipped re-renders. In such cases, it is better to use a regular Component and implement the shouldComponentUpdate method manually to ensure that the component only re-renders when necessary.

### Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
Using context and shouldComponentUpdate together can lead to unexpected behavior and memory leaks because `shouldComponentUpdate` isn't designed to receive context updates.

When a context provider updates, it will trigger a re-render of all the child components that use that context. However, if a child component implements the `shouldComponentUpdate` method to optimize rendering, it may not re-render even if the context changes.

This can result in the component using outdated context values that can lead to unexpected behavior. Additionally, by referencing old context values component will prevent GC to clear-up this memory generating memory leak.


### Describe 3 ways to pass information from a component to its PARENT.
Props: Pass a function down as a prop from the parent to the child. The child component can then call this function with the necessary information, and the parent component can use that information to update its state or perform any other necessary actions.

Callbacks: Pass a callback function down as a prop from the parent to the child. The child component can then call this function with the necessary information, and the parent component can use that information to update its state or perform any other necessary actions.

Context: Use context to pass data down the component tree without the need to pass props manually at every level. The parent component provides a context value that can be accessed by its child components.




### Give 2 ways to prevent components from re-rendering.
1. Use `shouldComponentUpdate` method in class components.
2. Use `React.memo` higher-order component to memoize functional components.

### What is a fragment and why do we need it? Give an example where it might break my app.
A fragment is a component in React that allows you to group together multiple elements and components without creating an additional DOM node. It is useful when you need to return multiple elements from a component, but you don't want to add an unnecessary wrapper element to the DOM.

Fragment can break you app if you try to apply styles or event handlers to a fragment, it won't work as expected, because a fragment is not a real DOM element. In such cases, you should wrap the fragment in a real element like a div or span.

### Give 3 examples of the HOC pattern.

 The Higher-Order Component (HOC) pattern is a way to reuse component logic in React. Here are three examples of HOC patterns:

Authentication HOC: An authentication HOC is a HOC that wraps a component and adds authentication logic to it. It checks if the user is authenticated and, if not, redirects them to a login page.Here's an example:
```code
function withAuthentication(WrappedComponent) {
  class WithAuthentication extends React.Component {
    render() {
      if (!isAuthenticated) {
        return <Redirect to="/login" />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  return WithAuthentication;
}

const ProtectedComponent = withAuthentication(MyComponent);
```


Styling HOC: A styling HOC is a HOC that adds styles to a component. It can be used to create reusable styled components. Here's an example:

```code
function withStyles(WrappedComponent, styles) {
  class WithStyles extends React.Component {
    render() {
      return <div style={styles}><WrappedComponent {...this.props} /></div>;
    }
  }

  return WithStyles;
}

const StyledComponent = withStyles(MyComponent, { backgroundColor: 'red' });

```

API Data HOC: An API data HOC is a HOC that fetches data from an API and passes it down as props to the component. It can be used to fetch data and provide it to multiple components that need it. Here's an example:
```code 
function withAPIData(WrappedComponent) {
  class WithAPIData extends React.Component {
    state = { data: null };

    async componentDidMount() {
      const response = await fetch('/api/data');
      const data = await response.json();
      this.setState({ data });
    }

    render() {
      const { data } = this.state;

      if (!data) {
        return <div>Loading...</div>;
      }

      return <WrappedComponent data={data} {...this.props} />;
    }
  }

  return WithAPIData;
}

const DataComponent = withAPIData(MyComponent);
```
### what's the difference in handling exceptions in promises, callbacks and async...await.

Promises use `.catch()` to handle errors, callbacks pass an error as the first argument of the callback function, and `async...await` uses a `try...catch` block to catch errors.
```code 
  //Callback 
  fs.readFile('text.txt', (err,data) => {
    if (err) {
     // handle error
  };
  //Promise
  readFilePropmise('text.txt')
   .then()
   .catch(err => {// handle error})
   
   //Async await
   const getFileData = () => {
     try {
       const data = await readFilePropmise('text.txt')
     }
     catch(e){ // handle error }
   }
  
});
```
### How many arguments does setState take and why is it async.
   `setState()` takes two arguments: an object that represents the new state, and an optional callback function that will be executed after the state has been updated.

The reason why setState() is asynchronous in nature is that React batches state updates for performance reasons. When you call setState(), React doesn't immediately update the state and re-render the component. Instead, it queues up the state update requests and performs them in batches.

### List the steps needed to migrate a Class to Function Component.
   1. Identify the stateful logic in the Class Component that needs to be migrated to the Function Component. This can include the constructor, state, and lifecycle methods.
   2. Remove the constructor and this.state from the Class Component. Instead, declare the state using the useState Hook in the Function Component.
   3. Replace lifecycle methods (e.g. componentDidMount, componentDidUpdate, componentWillUnmount) with their equivalent Hooks (useEffect, useLayoutEffect, useContext, etc.).
   4. Convert any instance methods that use this to regular functions that take arguments as props.
   5. Remove the render method from the Class Component and return the JSX directly from the Function Component.

### List a few ways styles can be used with components.

1. Inline styles. You can define styles as an object and pass them as props to your component.
2. CSS classes. You can define styles in an external stylesheet and apply them to your component using the className prop.
3. CSS modules. This is similar to using CSS classes, but with the added benefit of local scoping. Styles are defined in a separate stylesheet, but are scoped to the component, preventing style conflicts.
4. Styled components. You can use the `styled-components` library to define styles using a CSS-like syntax, which generates unique class names and injects the styles into the component's shadow DOM.


### How to render an HTML string coming from the server.

To render an HTML string coming from the server in React, you can use the `dangerouslySetInnerHTML` attribute.

 `dangerouslySetInnerHTML` can be dangerous, as it can expose your application to cross-site scripting (XSS) attacks.  Sanitization is required for any user-generated content before rendering it in your application.
