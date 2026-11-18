import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    onLoad(){

    }//加载函数，脚本第一个执行的函数，一版用来监听事件

    onDestroy(){

    }// 组件被销毁时运行的函数

    start() {

    } //启动脚本时运行的函数

    update(deltaTime: number) {
        
    } //一秒执行60次也就是一帧一次。循环函数

    lateUpdate(){

    } // 延迟执行函数：每帧在循环函数后执行

    onDisaable(){

    }// 节点隐藏禁用时，自动执行

    onEnable(){
        
    } // 节点启用时显示时，执行的函数，用于监听事件


}


