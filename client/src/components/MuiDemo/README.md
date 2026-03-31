# MUI Demo

This folder contains an internal visual demo page for the FOLA’s Material UI theme and component styling.

It is mainly used to quickly preview:
- Buttons (including custom variants)
- Chips (including custom colors)
- Links
- Typography
- Text fields and form states
- Paper elevations
- Theme palette swatches

## How To Access

1. Start the client app from the client folder:
   - npm start
2. Open this URL in your browser:
   - http://localhost:3000/admin/muidemo

## Route Location

The route is defined in [client/src/Routes.jsx](client/src/Routes.jsx#L144) and the page component is loaded from [client/src/Routes.jsx](client/src/Routes.jsx#L56).

## Main Demo Entry

The demo layout lives in [client/src/components/MuiDemo/MuiDemo.tsx](client/src/components/MuiDemo/MuiDemo.tsx).

## Notes

- This is an internal showcase/debug page and may not appear in app navigation.
- It is useful for quickly validating theme changes and visual regressions.