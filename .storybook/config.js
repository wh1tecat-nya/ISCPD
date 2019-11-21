import {
  configure,
} from "@storybook/react";
import "antd/dist/antd.less";

const req = require.context("../src/components", true, /stories.js$/);

function loadStories () {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
