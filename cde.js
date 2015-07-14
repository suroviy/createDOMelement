function createDOMelement (config) {
    this.arrayToString = function (val,dimer){
        var el = '';
        if (typeof dimer !== 'string'){
            dimer = ' ';
        }
        if (typeof val === 'string'){
            el = val;
        }
        if (typeof val === 'object'){
            val.forEach(function(item,i,arr){
                el = el+item;
                if (arr.length > i+1){
                    el = el+dimer;
                }
            });
        }
        return el;
    }
    
    this.bindToString = function (val){
    
        if (typeof val === 'object'){
            var bind = [];
            if (typeof val.forEach !== 'undefined'){
                
                val.forEach(function(item){
                    if (typeof item === 'object'){
    
                        bind.push(this.bindToString(item));
                    }else{
                        bind.push(item);
                    }
                });
                return '['+arrayToString(bind,',')+']';
            }else{
                for(var p in val) {
                    if (typeof val[p] === 'object'){
                        bind.push("'"+p+"':"+this.bindToString(val[p]));
                    }else{
                        bind.push("'"+p+"':'"+val[p]+"'");
                    }
                }
                return '{'+arrayToString(bind,',')+'}';
            }
        }
    
        return '{}';
    }

    this.create =  function (config){
        if (typeof config.tag === 'string'){
            var el = document.createElement(config.tag);
        }else{
            var el = document.createElement('div');
        }
        
        /*bind*/    
        if (typeof config.bind === 'object'){
            el.setAttribute('data-bind', this.bindToString(config.bind));
        }
    
        /*class*/    
        if (typeof config.class !== 'undefined'){
            el.className = this.arrayToString(config.class);
        }
        
        /*style*/
        if (typeof config.style === 'object'){
            for(var p in config.style) {
                el.style[p] = config.style[p];
            }
        }
        /*value*/
        if (typeof config.value === 'string'){
            el.value = config.value;
        }
        
        
        /*html*/
        if (typeof config.html === 'string'){
            el.innerHTML = config.html;
        }else{
            /*inner*/
            if (typeof config.inner === 'object'){
                if ( typeof config.inner.forEach !== 'undefined'){
    
                config.inner.forEach(function(item){
                    el.appendChild(this.create(item));
                });
    
                }else{
                    el.appendChild(config.inner);
                }
            }
        }    
        return el;
    }
    return this.create(config);
}
