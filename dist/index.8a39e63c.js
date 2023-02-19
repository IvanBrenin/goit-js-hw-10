(async function(n){const t=await fetch(`https://restcountries.com/v3.1/name/${n}`);return await t.json()})("ukraine").then((n=>{console.log(n)})).catch((n=>{console.error(n)}));
//# sourceMappingURL=index.8a39e63c.js.map
