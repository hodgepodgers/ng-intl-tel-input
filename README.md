# ng-intl-tel-input

AngularJS 1.4.x module implementing intl-tel-input directive (https://github.com/Bluefieldscom/intl-tel-input)

[![Build Status](https://travis-ci.org/hodgepodgers/ng-intl-tel-input.svg?branch=master)](https://travis-ci.org/hodgepodgers/ng-intl-tel-input)

## What it does

### Initialization

`ngIntlTelInputProvider` is available to set configs in the module config phase.

### Validation

Operates as a normal validator for a form input based on the selected country.

### Formatting

Assigns the final formatted telephone number to the ng-model binding.

## Demo

http://hodgepodgers.github.io/ng-intl-tel-input/

## Usage

### Installation

**With Bower**

`bower install ng-intl-tel-input --save`

**Manually**

`git clone https://github.com/rswebteam/ng-intl-tel-input.git`

### Provider setup and config

Inject `ngIntlTelInput` into your application module

```javascript
var myApp = angular.module('myApp', ['ngIntlTelInput']);
```

Configure defaults

> See: https://github.com/Bluefieldscom/intl-tel-input#options

```javascript
angular.module('myApp')
  .config(function (ngIntlTelInputProvider) {
    ngIntlTelInputProvider.set({defaultCountry: 'us'});
  });
```

### Directive usage

#### ng-intl-tel-input attribute

This attribute applies _intl-tel-input_ to a **text** field.

```html
<input type="text" ng-model="model.tel" ng-intl-tel-input>
```

**Note**

* `type` is set to *text*
* `ng-model` is specified (required)

#### data-default-country attribute

This attribute allows run-time setting of the default country.

```html
<input type="text" ng-model="model.tel" ng-intl-tel-input data-default-country="gb">
```

#### data-default-number-type attribute

This attribute allows run-time setting of the default number type (MOBILE/FIXED_LINE).

```html
<input type="text" ng-model="model.tel" ng-intl-tel-input data-default-number-type="MOBILE">
```
