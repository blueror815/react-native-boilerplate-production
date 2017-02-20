import test from 'ava'
import React from 'react'
import Button from '../../src/components/Button'
import { shallow } from 'enzyme'

test('component structure', t => {
  const wrapper = shallow(<Button onPress={() => {}} text='hi' />)

  t.is(wrapper.name(), 'TouchableOpacity') // root component
  t.is(wrapper.children().length, 1) // has 1 child
  t.is(wrapper.children().first().name(), 'Text')
});

test('disabledStyle', t => {
  const wrapper = shallow(<Button disabled disabledStyle={{ backgroundColor: 'red' }} />)

  t.is(wrapper.name(), 'TouchableOpacity') // root component
  t.is(wrapper.prop('style').length, 3)
  t.is(wrapper.prop('style')[2].backgroundColor, 'red')
});

test('onPress', t => {
  let i = 0
  const onPress = () => i++
  const wrapper = shallow(<Button onPress={onPress} text='hi' />)

  t.is(wrapper.prop('onPress'), onPress) // uses the right handler
  t.is(i, 0)
  wrapper.simulate('press')
  t.is(i, 1)
});
