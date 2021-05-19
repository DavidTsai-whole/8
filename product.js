const num = document.querySelector('#productCount');

const app = {
    data: {
        url:'https://vue3-course-api.hexschool.io',
        path:'jamestsai',
        products:[],
        
    },
    getData(){
     axios.get(`${this.data.url}/api/${this.data.path}/admin/products`).then(res=>{
         if(res.data.success){
            this.data.products = res.data.products;
            num.textContent = this.data.products.length;
          this.render();
         }
         
     })
     
    },
    render(){
        const product = document.querySelector('#productList');
        let str = '';
        this.data.products.forEach(item=>{
            str +=`<tr>
            <td>${item.title}</td>
            <td>${item.origin_price}</td>
            <td>${item.price}</td>
            <td><span class="${item.is_enabled ? 'text-success' : 'text-danger'}">${item.is_enabled ? '啟用' : '未啟用'}</span></td>
            <td><button type="button" class="btn delete btn-sm btn-outline-danger"data-id="${item.id}">刪除</button></td>
            </tr>`
        })
        product.innerHTML = str
        const delteBtn = document.querySelectorAll('.delete');
        delteBtn.forEach(item=>{
            item.addEventListener('click',this.deleteProduct)
        })
    },
    deleteProduct(e){
     let id = e.target.dataset.id;
     axios.delete(`${app.data.url}/api/${app.data.path}/admin/product/${id}`).then(res=>{
         console.log(res.data.message);
         app.getData();
     })
      
    },
    created() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschool\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.getData();
    },
}
app.created();








