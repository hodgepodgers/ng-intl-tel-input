# ng-intl-tel-input

AngularJS 1.4.x module implementing intl-tel-input directive (https://github.com/Bluefieldscom/intl-tel-input)

[![Build Status](https://travis-ci.org/rswebteam/ng-intl-tel-input.svg)](https://travis-ci.org/rswebteam/ng-intl-tel-input)

## What it does

### Initialization

`ngIntlTelInputProvider` is available to set configs in the module config phase.

### Validation

Operates as a normal validator for a form input based on the selected country.

### Formatting

Assigns the final formatted telephone number to the ng-model binding.

## Demo

~~Add link to demo~~

## How to

### Installation

**With Bower**

`bower install ng-intl-tel-input --save`

**Manually**

`git clone https://github.com/rswebteam/ng-intl-tel-input.git`

**Setup and Config**

Inject `ngIntlTelInput` into your application module

```javascript
var myApp = angular.module('myApp', ['ngIntlTelInput']);
```

Configure defaults

> See: https://github.com/Bluefieldscom/intl-tel-input#options

```javascript
angular.module('myApp')
  .config(['ngIntlTelInputProvider', function (ngIntlTelInputProvider) {
    ngIntlTelInputProvider.allowExtensions = false;
    ...
  }]);
```

### Directive Attributes

**ng-intl-tel-input**

This attribute converts a *text* field to the _intl-tel-input_.

```html
<input type="text" ng-model="model.tel" ng-intl-tel-input>
```

