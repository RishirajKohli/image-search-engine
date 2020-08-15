import React, { memo } from "react";
import { Route, Switch } from "react-router-dom";
import ImageSearchPage from "../../containers/ImageSearchPage";
function Routes() {
  return (
    <Switch>
      <Route path="/" component={ImageSearchPage}></Route>
    </Switch>
  );
}
export default memo(Routes);
