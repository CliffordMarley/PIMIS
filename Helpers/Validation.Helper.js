
module.exports = class {
    Isset = (field)=>{
        if(field && field != null && field != "" && field != typeof undefined){
            return true
        }
        return false
    }
}