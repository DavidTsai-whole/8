const url = 'https://vue3-course-api.hexschool.io'; // 請加入站點
const path = 'jamestsai'; // 請加入個人 API Path;

const loginBtn = document.querySelector('.login');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');


function login(){
    const username = usernameInput.value;
    const password = passwordInput.value;
    const data = {
        username,
        password
    }
    axios.post(`${url}/admin/signin`,data).then(res=>{
      if(res.data.success){
          /* const token = res.data.token;
          const expired = res.data.expired; */
          const {token,expired} = res.data;
          document.cookie = `hexschool=${token}; expires=${new Date(expired)}`;
          
          window.location = 'product.html';
      }else{
          alert(res.data.message)
      }
    })
}
    



loginBtn.addEventListener('click',login)