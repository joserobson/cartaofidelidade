
class DateHelper{

    static formatarData(d){
                
        let dformat = [d.getDate().padLeft(),
                    (d.getMonth()+1).padLeft(),
                    d.getFullYear()].join('/') +' ' +
                    [d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');

        return dformat;
    }
}

export{DateHelper}