const inputValue=document.querySelector("#input-value");
const addTodo=document.querySelector("#icon-todo");
const contanirTodo=document.querySelector("#todo-contaner");
const selectTodo=document.querySelector("#selected-todo");
const undoneWork=document.querySelector("#undoneWork");
const serch=document.querySelector("#serch");
import "./output.css"

addTodo.addEventListener("click",add);
contanirTodo.addEventListener("click",chickRemove);
selectTodo.addEventListener("click",selected);
document.addEventListener("DOMContentLoaded",localAddDom)
serch.addEventListener("input",serching)

function add(e) {
    e.preventDefault();
  if(inputValue.value==""){
   alert("plese writhing somthing")
  }else{
    const div=document.createElement("div");
    div.innerHTML=`
    <div class="bg-white w-72 flex  px-2 py-1 rounded-sm mt-2 justify-between items-center md:w-96 md:h-10">
    <p  class="text-gray-900 font-bold md:text-xl">${inputValue.value}</p>
    <div>
    <button class=" text-blue-700"><i class="fa-solid fa-circle-check"></i></button>
    <button class=" text-red-700 ml-1"><i class="fa-solid fa-trash"></i></button>
    </div>
    </div>`;
    contanirTodo.appendChild(div);
    addLocal(inputValue.value);
    numberUndoneWork()
    inputValue.value="";
  }
};
function chickRemove(e){
const classList=[...e.target.classList];
if(classList[1]=='fa-trash'){
const trash=e.target.parentElement.parentElement.parentElement.parentElement;
removeLocal(trash);
console.log(trash);
trash.remove();
}else if(classList[1]=='fa-circle-check'){
    const check=e.target.parentElement.parentElement.previousElementSibling;
    check.classList.toggle("line-through");
    check.classList.toggle("opacity-50");
}
numberUndoneWork();
};
function selected(e) {
    const filters=[...contanirTodo.childNodes];
    filters.forEach(item => {
         switch (e.target.value) {
        case 'all':
            item.style.display='flex';
            break;
        case 'completed':
            if(item.children[0].children[0].classList.contains("line-through")){
                item.style.display='flex';
            }else {
                item.style.display='none';
            }
        break;
        case 'uncompleted':
            if(!item.children[0].children[0].classList.contains("line-through")){
                item.style.display='flex';
            }else {
                item.style.display='none';
            }
        break;
    }
    });
    numberUndoneWork();
}
function addLocal(todo) {
    const getLocal=JSON.parse(localStorage.getItem("todo"))||[];
    getLocal.push(todo);
    localStorage.setItem('todo',JSON.stringify(getLocal));
};
function localAddDom(){
    const getLocal=JSON.parse(localStorage.getItem("todo"))||[]; 
    getLocal.forEach((e)=>{
        const div=document.createElement('div');
        div.innerHTML=`
        <div class="bg-white w-72 flex  px-2 py-1 rounded-sm mt-2 justify-between items-center md:w-96 md:h-10">
        <p class="text-gray-900 font-bold md:text-xl">${e}</p>
        <div>
        <button class="text-blue-700"><i class="fa-solid fa-circle-check"></i></button>
        <button class="text-red-700 ml-1"><i class="fa-solid fa-trash"></i></button>
        </div>
        </div>`;
        contanirTodo.appendChild(div);
    })
    numberUndoneWork();
}
function removeLocal(e){
    const getLocal=JSON.parse(localStorage.getItem("todo"))||[]; 
    const saveToLocal=getLocal.filter((i)=> i !== e.children[0].children[0].innerText);
    localStorage.setItem('todo',JSON.stringify(saveToLocal))
}
function numberUndoneWork() {
    const number=[...contanirTodo.childNodes];
   const a= number.filter(c=>!c.children[0].children[0].classList.contains("line-through"))
   undoneWork.textContent=a.length
}
function serching(e) {
    const todos=[...contanirTodo.childNodes]; 
     todos.forEach(todo=>{
        if (todo.children[0].children[0].textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
            todo.style.display='flex';
        } else {
            todo.style.display='none';
        }
    });
}



