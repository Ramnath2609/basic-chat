const decryption = (str) => {
    const res = []
    for(let i = 0; i < str.length; i+=3){
        res.push(str.slice(i, i+3))
    }
    const result = res.reverse().map(ele => {
        return String.fromCharCode(ele)
    })
    return result.join('')
}

module.exports = decryption