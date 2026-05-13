Things I Have learnt from this:

- Fast Refresh warnings happen when exporting non-components with components(can be disabled in eslint config if neede)
- Theme toggling in React/Tailwind can break due to provider/class issues
- Splitting data/helpers improves component structure
- Calling setState synchronously within an effect can trigger cascading renders

- the use of type any can be allowed in eslint config if needed

- keep an eye out for routing issues such as wrong path(app.use = route starting point, router.get = after starting point)

- hydration errors should be prevented at all cost!!