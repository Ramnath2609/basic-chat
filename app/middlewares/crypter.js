function crypter(str){
    const cipher = {a : 'n', b : 'o', c : 'p', d : 'q', e : 'r', f : 's', g : 't', h : 'u', i : 'v', j : 'w', k : 'x', l : 'y', m : 'z', n : 'a', o : 'b', p : 'c', q : 'd', r : 'e', s : 'f', t : 'g', u : 'h', v :'i', w : 'j', x : 'k', y : 'l', z : 'm', 0 : '@', 1: '*', 2 : '#', 3 : '(', 4 : ')', 5 : '/', 6 : '[', 7 : ']', 8 : '&', 9 : '$', '!' : '?', '-' : '=', '+' : '.', ':' : ',', '@' : '0', '*' : '1', '#' : '2', '(' : '3', ')' : '4', '/' : '5', '[' : '6', ']' : '7', '&' : '8', '$' : '9', '?' : '!', '=' : '-', '.' : '+', ',' : ':', '%' : ' ','{' : ';', ';' : '{', '}' : '_', '_' : '}', '^' : '\\','\\' : '^' }
    let result = ''
    for(let i = 0; i < str.length; i++){
        if(str[i] == ' '){
            result += '%'
        }else if(str[i] == str[i].toUpperCase()){
            result += cipher[str[i].toLowerCase()].toUpperCase()
        }else{
            result += cipher[str[i]]
        }
    }
    return result
}


module.exports = crypter