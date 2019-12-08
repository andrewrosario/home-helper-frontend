import { describe } from 'riteway';
import render from 'riteway/render-component';
import React from 'react';
import ProjectList from '../src/components/projectList';

describe('ProjectList component', async assert => {
  const props = {
    handleProjectClick: () => {console.log(this)},
    project: {
        title: 'A new Project'
    }
  };
  const $ = render(<ProjectList handleProjectClick={props.handleProjectClick} project={props.project} />);
  assert({
    given: 'a title',
    should: 'Render a list item to the correct title.',
    actual: $('.menu-item')
      .html()
      .trim(),
    expected: `A new Project`
  });
});