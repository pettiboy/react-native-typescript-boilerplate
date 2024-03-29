package com.chefcities.boilerplate;
import com.facebook.react.ReactActivity;
import android.os.Bundle; // custom https://reactnavigation.org/docs/getting-started/

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ReactNativeBoilerplate";
  }

  // custom https://reactnavigation.org/docs/getting-started/
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  // end custom
}
