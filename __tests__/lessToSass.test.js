import fs from 'fs';
import path from 'path';
import lessToSass from '../lessToSass';

// test('Sample files', async () => {
//   // TODO Directly convert on file system to test imports?
//   const sourceLess = fs.readFileSync(path.resolve(__dirname, 'samples/sample.less')).toString();
//   const expectedScss = fs.readFileSync(path.resolve(__dirname, 'samples/sample.scss')).toString();
//   const resultScss = await lessToSass.convert(sourceLess);
//   expect(resultScss).toBe(expectedScss);
// });

describe("variables", async function() {
  it('converts interpolated variables to #{$', async function() {
    const result = await lessToSass.convert('@san-serif-stack: helvetica, arial; @standard-fonts: ~\'@{san-serif-stack}, sans-serif\';');
    expect(result).toBe('$san-serif-stack: helvetica, arial; $standard-fonts: \'#{$san-serif-stack}, sans-serif\';');
  });

  // it('converts @ for variables to $', async function() {
  //   const result = await lessToSass.convert('@var1: #000;');
  //   expect(result).toBe('$var1: #000;');
  // });
  //
  // it('converts multiple variables in the same line', async function() {
  //   const result = await lessToSass.convert('@var1: #000; @var2: #fff;');
  //   expect(result).toBe('$var1: #000; $var2: #fff;');
  // });
  //
  // it('still converts variables have the word "media" in them', async function() {
  //   const result = await lessToSass.convert('@mediaType: screen;');
  //   expect(result).toBe('$mediaType: screen;');
  // });
  //
  // it('still converts variables have the word "import" in them', async function() {
  //   const result = await lessToSass.convert('@importType: screen;');
  //   expect(result).toBe('$importType: screen;');
  // });
  //
  // it('still converts variables have the word "import" in them', async function() {
  //   const result = await lessToSass.convert('@mixinType: screen;');
  //   expect(result).toBe('$mixinType: screen;');
  // });
  //
  // it('does not convert @ to $ for media queries', async function() {
  //   const result = await lessToSass.convert('@media(min-width:768px) {}');
  //   expect(result).toBe('@media(min-width:768px) {}');
  // });
  //
  // it('does not convert @ to $ for @mixin statements', async function() {
  //   const result = await lessToSass.convert('@mixin screen() {}');
  //   expect(result).toBe('@mixin screen() {}');
  // });
  //
  // it('does not convert @ to $ for @import statements', async function() {
  //   const result = await lessToSass.convert('@import "common"');
  //   expect(result).toBe('@import "common"');
  // });
  //
  // it('does not convert @ to $ for @font-face statements', async function() {
  //   const result = await lessToSass.convert('@font-face {}');
  //   expect(result).toBe('@font-face {}');
  // });
  //
  // it('does not convert @ to $ for @keyframes statements', async function() {
  //   const result = await lessToSass.convert('@keyframes {}');
  //   expect(result).toBe('@keyframes {}');
  // });
});

// describe("~ strings", async function() {
//   it('converts ~\'\' to \'\'', async function() {
//     const result = await lessToSass.convert('~\'san-serif\'');
//     expect(result).toBe('\'san-serif\'');
//   });
//
//   it('converts ~"" to ""', async function() {
//     const result = await lessToSass.convert('~"san-serif"');
//     expect(result).toBe('"san-serif"');
//   });
// });
//
// describe("colour helpers", async function() {
//   it('converts spin function to adjust-hue', async function() {
//     const result = await lessToSass.convert('spin(#aaaaaa, 10)');
//     expect(result).toBe('adjust-hue(#aaaaaa, 10)');
//   });
// });
// describe("extend", async function() {
//   it('converts &:extend syntax', async function() {
//     const result = await lessToSass.convert('.bar {\n  &:extend(.foo2);\n}');
//     expect(result).toBe('.bar {\n  @extend .foo2;\n}');
//   });
// });

// describe("mixins", async function() {
//   it('converts mixin declarations to use the @mixins syntax', async function() {
//     const result = await lessToSass.convert('.drop-shadow(@x-axis: 0, @y-axis: 1px, @blur: 2px, @alpha: 0.1) {\n}');
//     expect(result).toBe('@mixin drop-shadow($x-axis: 0, $y-axis: 1px, $blur: 2px, $alpha: 0.1) {\n}');
//   });
//
//   it('converts mixin declarations with new lines in param list and retains the new lines', async function() {
//     const result = await lessToSass.convert('.drop-shadow(\n @x-axis: 0,\n @y-axis: 1px,\n @blur: 2px,\n @alpha: 0.1) {\n}');
//     expect(result).toBe('@mixin drop-shadow(\n $x-axis: 0,\n $y-axis: 1px,\n $blur: 2px,\n $alpha: 0.1) {\n}');
//   });
//
//   it('converts mixin declarations with semicolons in param list and treat them as params', async function() {
//     // http://lesscss.org/features/#mixins-parametric-feature-mixins-with-multiple-parameters
//     // Semicolons separated params.
//     const result = await lessToSass.convert('.button-variant(@color; @background; @border) {\n    /**/\n}');
//     expect(result).toBe('@mixin button-variant($color, $background, $border) {\n    /**/\n}');
//   });
//
//   it('do not converts mixin declarations with semicolons and colons mixed in param list', async function() {
//     // http://lesscss.org/features/#mixins-parametric-feature-mixins-with-multiple-parameters
//     const result = await lessToSass.convert('.name(1, 2, 3; something, else) {\n}');
//     // TODO Flag the case as ambiguous?
//     expect(result).toBe('.name(1, 2, 3; something, else) {\n}');
//   });
//
//   it('converts mixin declarations with mixin call inlined', async function() {
//     const result = await lessToSass.convert('.setTapColor(@c:rgba(0,0,0,0)) {\n    -webkit-tap-highlight-color: @c;\n}');
//     expect(result).toBe('@mixin setTapColor($c:rgba(0,0,0,0)) {\n    -webkit-tap-highlight-color: $c;\n}');
//   });
//
//   it('converts mixin declarations with zero param', async function() {
//     const result = await lessToSass.convert('.foo() {\n  display: block;\n}');
//     expect(result).toBe('@mixin foo() {\n  display: block;\n}');
//   });
//
//   it('converts mixin call without argments to use the @include syntax', async function() {
//     const result = await lessToSass.convert('.box-sizing();');
//     expect(result).toBe('@include box-sizing();');
//   });
//
//   it('converts mixin call in shorthand form to use the @include syntax', async function() {
//     const result = await lessToSass.convert('.box-sizing;');
//     expect(result).toBe('@include box-sizing;');
//   });
//
//   it('converts mixin call with arguments to use the @include syntax', async function() {
//     const result = await lessToSass.convert('.drop-shadow(0, 2px, 4px, 0.4);');
//     expect(result).toBe('@include drop-shadow(0, 2px, 4px, 0.4);');
//   });
//
//   it('does not convert .foo .bar', async function() {
//     const result = await lessToSass.convert('.foo .bar {}');
//     expect(result).toBe('.foo .bar {}');
//   });
//
//   it('does not convert .5em (or similar)', async function() {
//     const result = await lessToSass.convert('font-size: .5em;');
//     expect(result).toBe('font-size: .5em;');
//   });
// });
//
// describe('imports', async function() {
//   it('convert imports with the .less extension to .scss', async function() {
//     const result = await lessToSass.convert('@import \'app/app.less\';');
//     expect(result).toBe('@import \'app/app.scss\';');
//   });
// });
//
// describe('functions', async function() {
//   describe('unit', async function() {
//     // http://lesscss.org/functions/#misc-functions-unit
//     it('convert one param call of less unit to sass unit-less', async function() {
//       // http://sass-lang.com/documentation/Sass/Script/Functions.html#unitless-instance_method
//       const result = await lessToSass.convert('unit(5em)');
//       expect(result).toBe('unit-less(5em)');
//     });
//     it('convert two param call of less unit without unit in first param to dimension + unit', async function() {
//       const result = await lessToSass.convert('unit(42,px)');
//       expect(result).toBe('0px + 42');
//     });
//     it('convert two param call of less unit with unit in first param to unit conversion', async function() {
//       // https://www.sitepoint.com/understanding-sass-units/
//       const result = await lessToSass.convert('unit(5in,px)');
//       expect(result).toBe('0px + 5in');
//     });
//     it('manage variable in first param', async function() {
//       const result = await lessToSass.convert('unit($size,px)');
//       expect(result).toBe('0px + $size');
//     });
//   });
// });
//
// describe("control flow", async function() {
//   it.skip('strips out { and }', async function() {
//     // TODO
//     expect(false).toBe(true);
//   });
//
//   it.skip('strips out ;', async function() {
//     // TODO
//     expect(false).toBe(true);
//   });
// });
