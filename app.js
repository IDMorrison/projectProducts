class Product {
    constructor(name,price,year){
        this.name=name;
        this.price=price;
        this.year=year;
    }
}

class UI {
    
    addProduct(product){
        const arrayDiv = document.getElementById('product-list').children;
        const productList = document.getElementById('product-list') // accedo al div en el cual luego agregare el div
        const element = document.createElement('div'); // creo un elemento a traves del method createElement(elementoHtml)
        element.innerHTML = `     
            <div class="card text-center mb-4" name="product">
                <div class="card-body">
                    <strong> Product Name </strong>: ${product.name} 
                    <strong> Product Price </strong>: ${product.price}
                    <strong> Product Year </strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div> 
            </div>
        `; // cargo el elemento a traves de la propiedad innerHTML en la constante element
        productList.appendChild(element); // una ves creado el elemento y cargado hacemos append al div ( 'product-list' )
        
        if (arrayDiv.length>6) {
            arrayDiv[1].remove();
        }
        this.showMessage("Producto agregado", 'success');
    }

    resetForm(){
        document.getElementById('product-form').reset(); // accedo al div y lo vacio con el method reset()
    }

    deleteProduct(element){
        if(element.name === 'delete'){
           (element.parentElement.parentElement.parentElement).remove();
           this.showMessage('Producto eliminado', 'info');
           const arrayDiv = document.getElementById('product-list').children;
           
           if (arrayDiv.length==1){
               arrayDiv.item(0).remove();
               buttonOnDelete=false;
           }
         }
    }
    
    createDeleteAllNSum(){
        const productList = document.getElementById('product-list') // accedo al div en el cual luego agregare el div
        const button = document.createElement('div');
        button.name="borrarTodo";
        button.className="mb-3";
        button.innerHTML= `
            <a href="#" class="btn btn-danger" name="deleteAll">Borrar Todo</a>
            <button name="costo" type="button" class="btn btn-primary">Calcular Costo Total</button>
        `;
        productList.appendChild(button);
    }

    deleteAll(element){
        if (element.name==='deleteAll'){
            const arrayProduct = document.getElementById('product-list').children;
            Array.from(arrayProduct).forEach(element => {
               element.remove();
            })
            this.showMessage('Productos eliminados','danger');

        }
    }
    showMessage(message, cssClass){
        const div1 = document.createElement('div');  // creo un div
        div1.className = `alert alert-${cssClass} mt-2`; // agrego una clase de boostrap a mi div
        div1.appendChild(document.createTextNode(message)); // creo un textNode a partir de un string, y lo adjunto al div
        
        // ahora lo muestro
        const container = document.querySelector('#divApp'); // apunto al div que contiene el id 'appli'
        const app = document.querySelector('#app'); // apunto al div que contiene el id 'app' (querySelector busca la primer coincidencia)
        container.insertBefore(div1, app); // inserto el div creado con instertBefore con sus parametros ("el elemento", " antes de x elemento")
        
        /* setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000); */
    }

    sumPrice(){
        
        const arrayPrice = document.getElementById('product-list').children;
        alert(arrayPrice[1].firstChild.firstChild.firstChild.text);
       /*  var acumPrice;
        for (let i = 1; i < arrayPrice.length; i++) {
            acumPrice += arrayPrice[i].firstChild.children[1].innerHTML;
        }
        alert('Llego al Final sumPrice()');
         */
    }
}

// DOM events

/* capturo el evento 'click' dentro del div 'product-list',(getelementbyid para el div, y addEventListenner para el evento que quiero capturar),
 luego paso por parametro el punto desde el cual se capturo el click (.target)
*/

var buttonOnDelete = false;
var funcionRemover;


// AgregarProductos // eventListener
document.getElementById('product-form')
    .addEventListener('submit', function(e){
        
        var name = document.getElementById("name").value;
        var price = document.getElementById("price").value;
        var year = document.getElementById("year").value;
        const product = new Product(name,price,year);
        const ui = new UI();
        e.preventDefault(); 
        
        if (name==='' || price==='' || year===''){
            manipularAlertas();
            return ui.showMessage('Campos vacios', 'info');
        }
        
        if (buttonOnDelete!=true){
            ui.createDeleteAllNSum();
            buttonOnDelete=true;    
        }
        
        manipularAlertas();
        
        ui.addProduct(product); 
        ui.resetForm();
    }
)

// BorrarProducto // eventListener
document.getElementById('product-list').addEventListener('click', function(e){ 
    if (e.target.name==="delete") {
        const ui = new UI();
        manipularAlertas();
        ui.deleteProduct(e.target);    
    }
});

// BorrarTodosProductos // eventListener
document.getElementById('product-list').addEventListener('click', function(e){
    if (e.target.name==="deleteAll") {
        const ui = new UI();
        manipularAlertas();
        ui.deleteAll(e.target);
        return buttonOnDelete=false;    
    }
})

// Sumar Precios // eventListener
document.getElementById('product-list').addEventListener('click',function(e){
    if (e.target.name==='costo'){
        const ui = new UI();
        ui.sumPrice();
    }
})




// Funciones
function manipularAlertas() {
    if (document.querySelector('.alert')===null){
        removerPorTiempo();
    } else {
        borrarExistente();
        document.querySelector('.alert').remove();
        removerPorTiempo();
    }    
}

function removerPorTiempo(){
     funcionRemover = setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 4000);
}
function borrarExistente(){
    clearTimeout(funcionRemover);
}