import React, {Component} from 'react';
import { Router, Route, Link ,IndexRoute,Redirect,browserHistory,hashHistory,createMemoryHistory} from 'react-router'

import Hello from './Hello';

class App extends Component{
    render() {
        return (
            <div>
                <Hello/>
                <h1>App</h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}
class About extends Component{
    render() {
        return <h3>About</h3>
    }
}

class Inbox extends Component{
    componentDidMount(){
        setTimeout(function(){
            hashHistory.push('/about')
        },3000);
    }
    render() {
        return (
            <div>
                <h2>Inbox</h2>
                {this.props.children || "Welcome to your Inbox"}
            </div>
        )
    }
}

class Dashboard extends Component{
    render() {
        return <div>Welcome to the app!</div>
    }
}


class Message extends Component{
    render() {
        return <h3>Message {this.props.params.id}</h3>
    }
}

const NoMatch = React.createClass({
    render() {
        return <h3>没有匹配的路径</h3>
    }
})


export default class ReactRouter extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    {/* 当 url 为/时渲染 Dashboard */}
                    <IndexRoute component={Dashboard} />
                    <Route path="about" component={About} />
                    <Route path="inbox" component={Inbox} onEnter={()=>console.log('进入inbox')} onLeave={()=>console.log('离开我们的inbox')}>
                        <Route path="messages/:id" component={Message} />
                        {/* 绝对路径用法 */}
                        {/*<Route path="/messages/:id" component={Message} />*/}
                        {/* 兼容旧的嵌套路由的写法，组件中的link还是原来的嵌套写法，但是浏览器中的url已经是绝对路径的写法了，目的就是让url看起来干净简洁 */}
                        {/*<Redirect from="messages/:id" to="/messages/:id" />*/}
                    </Route>
                </Route>
                <Route path="*" component={NoMatch}/>
            </Router>
        )
    }
}

