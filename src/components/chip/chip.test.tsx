/* Vendor imports */
import React from 'react'
import { mount } from 'enzyme'
/* App imports */
import Component from './index'

describe('Chip component', () => {
  test('matches snapshot', () => {
    let chip = mount(<Component>Text</Component>)
    expect(chip).toMatchSnapshot()
    let chipWithHoverEffect = mount(
      <Component hoverEffect={true}>Text</Component>
    )
    expect(chipWithHoverEffect).toMatchSnapshot()
    let chipWithClassName = mount(
      <Component className={'class'}>Text</Component>
    )
    expect(chipWithClassName).toMatchSnapshot()
    let chipWithHoverEffectAndClassName = mount(
      <Component hoverEffect={true} className={'class'}>
        Text
      </Component>
    )
    expect(chipWithHoverEffectAndClassName).toMatchSnapshot()
  })
})
