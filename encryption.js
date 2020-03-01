function encryption(str){
    const body = []
    for(let i = 0; i < str.length; i++){
        let val = String(str.charCodeAt(i))
       if(val.length == 2){
           val = '0' + val
       }
        body.push(val)
    }
    return body.join('')
}


const decryption = (str) => {
    const res = []
    for(let i = 0; i < str.length; i+=3){
        res.push(str.slice(i, i+3))
    }
    //console.log(res)
    const result = res.map(ele => {
        return String.fromCharCode(ele)
    })
    //console.log(result.join(''))
    return result.join('')
}

console.log(encryption('ram'))

console.log(decryption('114097109'))