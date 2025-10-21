import { render } from "./mod.ts"

function test(){
 const test =`
# Title in markdown


I'm a nomarl text with a **bold text**
 `

 const result = render(test);
 console.log(result, 'FT what is this')
}

test()