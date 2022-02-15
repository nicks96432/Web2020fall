const input = document.getElementById("todo-input");
const all_button= document.getElementById('all_button');
const active_button=document.getElementById('active_button');
const complete_button=document.getElementById('complete_button');
const clear_completed=document.getElementById('clear_completed');
var todo_item_id=0;
//Array of items list
var todo_items=[];
//Array of done items
var done_items=[];
//Array of undone items
var undone_items=[];
//create Item
function CreateNewItem(str){
  var h1_make = document.createElement("H1");
  h1_make.setAttribute("class", "todo-app__item-detail");
  h1_make.innerHTML=str;
  var img_make = document.createElement("IMG");
  img_make.setAttribute("class", "todo-app__item-x");
  img_make.setAttribute("src","./img/x.png");
  img_make.setAttribute("id", todo_item_id);
  img_make.addEventListener('click', delete_item);
  var checkbox = document.createElement("INPUT");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", todo_item_id);
  checkbox.setAttribute("class", "todo-item-input");
  checkbox.addEventListener('click', item_click);
  var label_make = document.createElement("label");
  label_make.setAttribute("for",todo_item_id);
  var wrapper = document.createElement("DIV");
  wrapper.setAttribute("class", "todo-app__checkbox");
  wrapper.appendChild(checkbox);
  wrapper.appendChild(label_make);
  var itemNode = document.createElement("LI");
  itemNode.appendChild(wrapper);
  itemNode.appendChild(h1_make);
  itemNode.appendChild(img_make);
  itemNode.setAttribute("class","todo-app__item");
  itemNode.setAttribute("id",'x'+todo_item_id);
  var ul=document.getElementById("todo-list");
  ul.appendChild(itemNode);
  todo_items.push({node: itemNode, id:todo_item_id, isComplete: false});
  //console.log(itemNode);
  todo_item_id++;
}
//Classify items from done and undone
function classify(){
  for(i=0;i<todo_items.length;i++){
    if(todo_items[i]!=null){
      if(todo_items[i].isComplete === true){
        undone_items[i]=null;
        done_items[i]=todo_items[i];
      }
      else{
        done_items[i]=null;
        undone_items[i]=todo_items[i];
      }
    }
  }
}
//delete the item by press X
function delete_item(event){
  let obj=document.getElementById('x'+event.target.id);
  //console.log(obj);
  obj.remove();
  undone_items[event.target.id]=null;
  done_items[event.target.id]=null;
  todo_items[event.target.id]=null;
  update_lefts_undone();
}
//click the button to let the item done
function item_click(event){
  let obj=document.getElementById('x'+event.target.id);
  let obj_input=document.getElementById(event.target.id);
  if(obj_input.checked==true){
    obj.style["textDecoration"]="line-through";
    obj.style["opacity"]=0.5;
    done_item(event.target.id);
  }
  else{
    obj.style["textDecoration"]="none";
    obj.style["opacity"]=1;
    undone_item(event.target.id);
  }
  update_lefts_undone();
}
// set item done
function done_item(id){
  todo_items[id].isComplete=true;
}
//set item undone
function undone_item(id){
  todo_items[id].isComplete=false;
}
//show up all the items except the deleted
function display_all(){
  for(i=0;i<todo_items.length;i++){
    if(todo_items[i]!=null){
      let obj= document.getElementById('x'+i);
      obj.style.display='flex';
    }
  }
}
//press the active button to see the undone items 
function active_ch(){
  display_all();
  classify();
  for(i=0;i<todo_items.length;i++){
    if(done_items[i] !=null && todo_items[i] !=null){
      let obj=document.getElementById('x'+i);
      obj.style.display='none';
    }  
  }
}
//press the completed button to see the done items 
function complete_ch(){
  display_all();
  classify();
  for(i=0;i<todo_items.length;i++){
    if(undone_items[i] !=null && todo_items[i] !=''){
      let obj=document.getElementById('x'+i);
      obj.style.display='none';
    }  
  }
}
//press the clearcompleted button to clear done items
function clear_done_items(){
  display_all();
  classify();
  for(i=0;i<todo_items.length;i++){
    if(done_items[i] !=null){
      let obj=document.getElementById('x'+i);
      obj.remove();
      done_items[i]=null;
      todo_items[i]=null;
    }
    //console.log(todo_items[i]);  
  }
  todo_items=undone_items;
}
//update the num of lefts
function update_lefts_undone(){
  classify();
  let count=0;
  for(i=0;i<todo_items.length;i++){
    if (undone_items[i]!=null) {
      count++;
    }
  }
  let lefts=document.getElementById('todo_num');
  lefts.innerHTML=count+' lefts';
}
input.addEventListener('keyup', event=>{
  if(event.keyCode === 13 && event.target.value !== ''){
    const newItem = CreateNewItem(event.target.value);
    event.target.value='';
    update_lefts_undone();
  }
});

active_button.addEventListener('click', event=>{
  active_ch();
  update_lefts_undone();

});
complete_button.addEventListener('click', event=>{
  complete_ch();
  update_lefts_undone();
})

all_button.addEventListener('click', event=>{
  display_all();
  update_lefts_undone();

})

clear_completed.addEventListener('click', event=>{
  clear_done_items();
  update_lefts_undone();

})
