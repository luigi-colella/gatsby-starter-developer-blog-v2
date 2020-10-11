/* Vendor imports */
import React from 'react'
import { shallow } from 'enzyme'
/* App imports */
import Header from './index'

describe('Header component', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  test('matches snapshot', () => {
    let wrapper = shallow(<Header />)

    expect(wrapper).toMatchSnapshot()
  })

  test('matches snapshot whether it is fixed or not', () => {
    let wrapper = shallow(<Header />)

    wrapper.setState({ fixedHeader: true })
    expect(wrapper).toMatchSnapshot()

    wrapper.setState({ fixedHeader: false })
    expect(wrapper).toMatchSnapshot()
  })

  test('toggles the `fixed` state on scroll event', () => {
    let eventHandler: any = {}
    window.addEventListener = jest.fn((event, cb) => {
      eventHandler[event] = cb
    })
    const wrapper = shallow(<Header />)

    // case #1: header is not fixed if scrollY < 100
    // @ts-ignore
    window.scrollY = 50
    eventHandler.scroll() // trigger event
    jest.runAllTimers() // internally `setTimeout` is used to throttle the event
    expect(wrapper.state('lastScrollY')).toBe(50)
    expect(wrapper.state('fixedHeader')).toBe(false)

    // case #2: header is fixed if scrollY > 100
    // @ts-ignore
    window.scrollY = 102
    eventHandler.scroll() // Trigger event
    jest.runAllTimers() // internally `setTimeout` is used to throttle the event
    expect(wrapper.state('lastScrollY')).toBe(102)
    expect(wrapper.state('fixedHeader')).toBe(true)

    // case #3: header is not fixed if scrollY > 'previous' scrollY
    // @ts-ignore
    window.scrollY = 101
    eventHandler.scroll() // Trigger event
    jest.runAllTimers() // internally `setTimeout` is used to throttle the event
    expect(wrapper.state('lastScrollY')).toBe(101)
    expect(wrapper.state('fixedHeader')).toBe(false)
  })
})
