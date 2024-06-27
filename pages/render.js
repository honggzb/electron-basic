console.log('render');

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const input = document.getElementById("input");

btn1.onclick = () => {
  alert(myAPI.version);
  //onsole.log('myAPI.version');
}

btn2.onclick = () => {
  //console.log(input.value);
  alert(input.value); // 这里需要通知到主进程
  myAPI.saveFile(input.value)
  //alert("save file successed")
}

// 这里代码可需要为异步的写法
btn3.onclick = async () => {
  var data = await myAPI.readFile("helloworld1");
  console.log(data);
}
