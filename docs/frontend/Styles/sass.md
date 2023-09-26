## Variable

```scss
$base-color: #c6538c;
$border-dark: rgba($base-color, 0.88);
.alert {
  border: 1px solid $border-dark;
}
```

## Mixin

- Khai báo mixin : `@mixin mixinName`
- Sử dụng mixin : `include mixinName`

```scss
@mixin square($width: "40px", $height: $width) {
  width: $width;
  height: $height;
}
.test {
  // @include square(10px);
  @include square;
}
```

## @use,@forward,@import

## function

## @extend
