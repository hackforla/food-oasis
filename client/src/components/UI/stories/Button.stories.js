import React from "react";
import { storiesOf } from "@storybook/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { decorators } from "../helpers";
import Grid from "@material-ui/core/Grid";
import { Button, IconButton } from "../index";

storiesOf("Components/Button", module)
  .addDecorator(decorators)
  .add("Overview", () => (
    <>
      <h1>Button</h1>
      <h2>Default</h2>
      <Button onClick={console.log}>Confirm </Button>
      <br />
      <br />
      <br />
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`<Button>
  Confirm
</Button>
`}
      </SyntaxHighlighter>

      <h2>With Icon</h2>

      <Grid container spacing={1}>
        <Grid item>
          <Button icon="add" onClick={console.log}>
            add
          </Button>
        </Grid>
        <Grid item>
          <Button icon="cancel" onClick={console.log}>
            cancel
          </Button>
        </Grid>
        <Grid item>
          <Button icon="close" onClick={console.log}>
            close
          </Button>
        </Grid>
        <Grid item>
          <Button icon="delete" onClick={console.log}>
            delete
          </Button>
        </Grid>
        <Grid item>
          <Button icon="details" onClick={console.log}>
            details
          </Button>
        </Grid>
        <Grid item>
          <Button icon="edit" onClick={console.log}>
            edit
          </Button>
        </Grid>
        <Grid item>
          <Button icon="remove" onClick={console.log}>
            remove
          </Button>
        </Grid>
        <Grid item>
          <Button icon="save" onClick={console.log}>
            save
          </Button>
        </Grid>
        <Grid item>
          <Button icon="search" onClick={console.log}>
            search
          </Button>
        </Grid>
        <Grid item>
          <Button icon="check" onClick={console.log}>
            check
          </Button>
        </Grid>
        <Grid item>
          <Button icon="arrowUp" onClick={console.log}>
            arrowUp
          </Button>
        </Grid>
        <Grid item>
          <Button icon="arrowDown" onClick={console.log}>
            arrowDown
          </Button>
        </Grid>
      </Grid>

      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`<Button icon="add">add</Button>`}
      </SyntaxHighlighter>
      <h3>Props</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`
children: PropTypes.string.isRequired,
onClick: PropTypes.func.isRequired,
iconPosition: PropTypes.oneOf(["end", "start"]), // will default to "start" if not provided
color: PropTypes.string,
icon: PropTypes.oneOf([
  "add",
  "arrowUp",
  "arrowDown",
  "cancel",
  "check",
  "close",
  "delete",
  "details",
  "edit",
  "locationOn",
  "locationSearching",
  "menu",
  "remove",
  "save",
  "search",
  "wrapText",
]),
`}
      </SyntaxHighlighter>
    </>
  ))
  .add("IconButton", () => (
    <>
      <h2>IconButton</h2>
      <Grid container>
        <Grid item xs>
          <IconButton icon="cancel" />
          <p>cancel</p>
        </Grid>
        <Grid item xs>
          <IconButton icon="remove" />
          <p>remove</p>
        </Grid>
        <Grid item xs>
          <IconButton icon="add" />
          <p>add</p>
        </Grid>
        <Grid item xs>
          <IconButton icon="delete" />
          <p>delete</p>
        </Grid>
        <Grid item xs>
          <IconButton icon="close" />
          <p>close</p>
        </Grid>
        <Grid item xs>
          <IconButton icon="save" />
          <p>save</p>
        </Grid>
        <Grid item xs>
          <IconButton icon="edit" />
          <p>edit</p>
        </Grid>
        <Grid item xs>
          <IconButton icon="search" />
          <p>search</p>
        </Grid>
        <Grid item xs>
          <IconButton icon="details" />
          <p>details</p>
        </Grid>
        <Grid item xs>
          <IconButton icon="arrowUp" />
          <p>arrowUp</p>
        </Grid>
        <Grid item xs>
          <IconButton icon="arrowDown" />
          <p>arrowDown</p>
        </Grid>
      </Grid>

      <br />
      <br />
      <br />

      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`<IconButton icon="cancel" />`}
      </SyntaxHighlighter>
      <h3>Props</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`
kind: PropTypes.string.isRequired,
onClick: PropTypes.func.isRequired,
color: PropTypes.string
`}
      </SyntaxHighlighter>
    </>
  ));
