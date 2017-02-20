import mockery from 'mockery'

// inject __DEV__
global.__DEV__ = true

// We enable mockery and leave it on.
mockery.enable()

// Silence mockery's warnings as we'll opt-in to mocks instead
mockery.warnOnUnregistered(false)
