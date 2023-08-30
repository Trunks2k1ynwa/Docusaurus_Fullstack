# Sass

- Là ngôn ngữ mở rộng của css, cung cấp các tính năng mới mẻ hơn để viết mã css hiệu quả và dễ bảo trì hơn

## Biến

```scss
$primary-color: #007bff;
.button {
  background-color: $primary-color;
  color: white;
}
```
## Nesting
```scss
.parent_block {
  .child_block {
    list-style: none;
    padding: 0;
    
    #feature {
      display: inline-block;
      margin-right: 10px;
    }
  }
}

```
## Mixins
```scss
@mixin rounded-corners($radius) {
  border-radius: $radius;
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
}

.button {
  @include rounded-corners(4px);
}

```
## Extend
```scss
.button-base {
  padding: 10px 20px;
  font-size: 16px;
}

.primary-button {
  @extend .button-base;
  background-color: #007bff;
  color: white;
}
```
## Import
```scss
@import 'variables';

.button {
  background-color: $primary-color;
  color: white;
}
```
## Conditional
```scss
@mixin absoluteCenter($direction: "left") {
  position: absolute;
  @if $direction == "left" {
    left: 50%;
    transform: translateX(-50%);
  }
  @if $direction == "top" {
    left: 50%;
    transform: translateY(-50%);
  }
  @if $direction == "both" {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
```