import fs from 'fs';
import path from 'path';
import lessToSass from '../lessToSass';

// test('Sample files', () => {
//   // TODO Directly convert on file system to test imports?
//   const sourceLess = fs.readFileSync(path.resolve(__dirname, 'samples/sample.less')).toString();
//   const expectedScss = fs.readFileSync(path.resolve(__dirname, 'samples/sample.scss')).toString();
//   const resultScss = lessToSass.convert(sourceLess);
//   expect(resultScss).toBe(expectedScss);
// });

describe("variables", function() {
  it('converts interpolated variables to #{$', async function() {
    const result = await lessToSass.convert('@san-serif-stack: helvetica, arial; @standard-fonts: ~\'@{san-serif-stack}, sans-serif\';');
    expect(result).toBe('$san-serif-stack: helvetica, arial; $standard-fonts: \'#{$san-serif-stack}, sans-serif\';');
  });

  // it('converts @ for variables to $', function() {
  //   const result = lessToSass.convert('@var1: #000;');
  //   expect(result).toBe('$var1: #000;');
  // });
  //
  // it('converts multiple variables in the same line', function() {
  //   const result = lessToSass.convert('@var1: #000; @var2: #fff;');
  //   expect(result).toBe('$var1: #000; $var2: #fff;');
  // });
  //
  // it('still converts variables have the word "media" in them', function() {
  //   const result = lessToSass.convert('@mediaType: screen;');
  //   expect(result).toBe('$mediaType: screen;');
  // });
  //
  // it('still converts variables have the word "import" in them', function() {
  //   const result = lessToSass.convert('@importType: screen;');
  //   expect(result).toBe('$importType: screen;');
  // });
  //
  // it('still converts variables have the word "import" in them', function() {
  //   const result = lessToSass.convert('@mixinType: screen;');
  //   expect(result).toBe('$mixinType: screen;');
  // });
  //
  // it('does not convert @ to $ for media queries', function() {
  //   const result = lessToSass.convert('@media(min-width:768px) {}');
  //   expect(result).toBe('@media(min-width:768px) {}');
  // });
  //
  // it('does not convert @ to $ for @mixin statements', function() {
  //   const result = lessToSass.convert('@mixin screen() {}');
  //   expect(result).toBe('@mixin screen() {}');
  // });
  //
  // it('does not convert @ to $ for @import statements', function() {
  //   const result = lessToSass.convert('@import "common"');
  //   expect(result).toBe('@import "common"');
  // });
  //
  // it('does not convert @ to $ for @font-face statements', function() {
  //   const result = lessToSass.convert('@font-face {}');
  //   expect(result).toBe('@font-face {}');
  // });
  //
  // it('does not convert @ to $ for @keyframes statements', function() {
  //   const result = lessToSass.convert('@keyframes {}');
  //   expect(result).toBe('@keyframes {}');
  // });
});

// describe("~ strings", function() {
//   it('converts ~\'\' to \'\'', function() {
//     const result = lessToSass.convert('~\'san-serif\'');
//     expect(result).toBe('\'san-serif\'');
//   });
//
//   it('converts ~"" to ""', function() {
//     const result = lessToSass.convert('~"san-serif"');
//     expect(result).toBe('"san-serif"');
//   });
// });
//
// describe("colour helpers", function() {
//   it('converts spin function to adjust-hue', function() {
//     const result = lessToSass.convert('spin(#aaaaaa, 10)');
//     expect(result).toBe('adjust-hue(#aaaaaa, 10)');
//   });
// });
// describe("extend", function() {
//   it('converts &:extend syntax', function() {
//     const result = lessToSass.convert('.bar {\n  &:extend(.foo2);\n}');
//     expect(result).toBe('.bar {\n  @extend .foo2;\n}');
//   });
// });

// describe("mixins", function() {
//   it('converts mixin declarations to use the @mixins syntax', function() {
//     const result = lessToSass.convert('.drop-shadow(@x-axis: 0, @y-axis: 1px, @blur: 2px, @alpha: 0.1) {\n}');
//     expect(result).toBe('@mixin drop-shadow($x-axis: 0, $y-axis: 1px, $blur: 2px, $alpha: 0.1) {\n}');
//   });
//
//   it('converts mixin declarations with new lines in param list and retains the new lines', function() {
//     const result = lessToSass.convert('.drop-shadow(\n @x-axis: 0,\n @y-axis: 1px,\n @blur: 2px,\n @alpha: 0.1) {\n}');
//     expect(result).toBe('@mixin drop-shadow(\n $x-axis: 0,\n $y-axis: 1px,\n $blur: 2px,\n $alpha: 0.1) {\n}');
//   });
//
//   it('converts mixin declarations with semicolons in param list and treat them as params', function() {
//     // http://lesscss.org/features/#mixins-parametric-feature-mixins-with-multiple-parameters
//     // Semicolons separated params.
//     const result = lessToSass.convert('.button-variant(@color; @background; @border) {\n    /**/\n}');
//     expect(result).toBe('@mixin button-variant($color, $background, $border) {\n    /**/\n}');
//   });
//
//   it('do not converts mixin declarations with semicolons and colons mixed in param list', function() {
//     // http://lesscss.org/features/#mixins-parametric-feature-mixins-with-multiple-parameters
//     const result = lessToSass.convert('.name(1, 2, 3; something, else) {\n}');
//     // TODO Flag the case as ambiguous?
//     expect(result).toBe('.name(1, 2, 3; something, else) {\n}');
//   });
//
//   it('converts mixin declarations with mixin call inlined', function() {
//     const result = lessToSass.convert('.setTapColor(@c:rgba(0,0,0,0)) {\n    -webkit-tap-highlight-color: @c;\n}');
//     expect(result).toBe('@mixin setTapColor($c:rgba(0,0,0,0)) {\n    -webkit-tap-highlight-color: $c;\n}');
//   });
//
//   it('converts mixin declarations with zero param', function() {
//     const result = lessToSass.convert('.foo() {\n  display: block;\n}');
//     expect(result).toBe('@mixin foo() {\n  display: block;\n}');
//   });
//
//   it('converts mixin call without argments to use the @include syntax', function() {
//     const result = lessToSass.convert('.box-sizing();');
//     expect(result).toBe('@include box-sizing();');
//   });
//
//   it('converts mixin call in shorthand form to use the @include syntax', function() {
//     const result = lessToSass.convert('.box-sizing;');
//     expect(result).toBe('@include box-sizing;');
//   });
//
//   it('converts mixin call with arguments to use the @include syntax', function() {
//     const result = lessToSass.convert('.drop-shadow(0, 2px, 4px, 0.4);');
//     expect(result).toBe('@include drop-shadow(0, 2px, 4px, 0.4);');
//   });
//
//   it('does not convert .foo .bar', function() {
//     const result = lessToSass.convert('.foo .bar {}');
//     expect(result).toBe('.foo .bar {}');
//   });
//
//   it('does not convert .5em (or similar)', function() {
//     const result = lessToSass.convert('font-size: .5em;');
//     expect(result).toBe('font-size: .5em;');
//   });
// });
//
// describe('imports', function() {
//   it('convert imports with the .less extension to .scss', function() {
//     const result = lessToSass.convert('@import \'app/app.less\';');
//     expect(result).toBe('@import \'app/app.scss\';');
//   });
// });
//
// describe('functions', function() {
//   describe('unit', function() {
//     // http://lesscss.org/functions/#misc-functions-unit
//     it('convert one param call of less unit to sass unit-less', function() {
//       // http://sass-lang.com/documentation/Sass/Script/Functions.html#unitless-instance_method
//       const result = lessToSass.convert('unit(5em)');
//       expect(result).toBe('unit-less(5em)');
//     });
//     it('convert two param call of less unit without unit in first param to dimension + unit', function() {
//       const result = lessToSass.convert('unit(42,px)');
//       expect(result).toBe('0px + 42');
//     });
//     it('convert two param call of less unit with unit in first param to unit conversion', function() {
//       // https://www.sitepoint.com/understanding-sass-units/
//       const result = lessToSass.convert('unit(5in,px)');
//       expect(result).toBe('0px + 5in');
//     });
//     it('manage variable in first param', function() {
//       const result = lessToSass.convert('unit($size,px)');
//       expect(result).toBe('0px + $size');
//     });
//   });
// });
//
// describe("control flow", function() {
//   it.skip('strips out { and }', function() {
//     // TODO
//     expect(false).toBe(true);
//   });
//
//   it.skip('strips out ;', function() {
//     // TODO
//     expect(false).toBe(true);
//   });
// });
