# More documentation about how to customize your build
# can be found here:
# https://docs.fastlane.tools
fastlane_version "1.109.0"

# This value helps us track success metrics for Fastfiles
# we automatically generate. Feel free to remove this line
# once you get things running smoothly!
generated_fastfile_id "2b258c8b-ac35-4254-9c11-1815af797aac"

default_platform :ios

# Fastfile actions accept additional configuration, but
# don't worry, fastlane will prompt you for required
# info which you can add here later
lane :beta do
  match(type: "appstore")
  increment_build_number(
      xcodeproj: './ios/RNBoilerplate.xcodeproj'
    )

  # build your iOS app
  gym(
    scheme: "RNBoilerplate",
    project: "./ios/RNBoilerplate.xcodeproj"
  )

  # upload to Testflight
  pilot(skip_waiting_for_build_processing: true)

  slack(
    # slack_url: "https://hooks.slack.com/services/IDS"
  )
end
