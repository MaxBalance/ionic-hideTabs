# ionic-hideTabs
>在ionic项目中，如果构建的是一个tabs项目，那会存在需要在进入下级页面时，隐藏掉底部或者顶部tabs的需求。本文介绍两种方式去实现，一种为通过css控制，另一种为通过设置路由实现。


###一、通过CSS隐藏tabs
  这种方式主要是通过一个css-->tabs-item-hide来实现，这个css是ionic.css中自带的一个简单的样式。
  
  **1.设置tabs标签**
  

```
<ion-tabs class="tabs-icon-top tabs-color-active-positive {{hideTabs}}" >

...

</ion-tabs>
```
  这里的{{hideTabs}}是在稍后指令里赋值的。

**2.指令**

```
.directive('hideTabs',function($rootScope){
    return {
      restrict:'AE',
      link:function($scope){
        $rootScope.hideTabs = 'tabs-item-hide';
        $scope.$on('$destroy',function(){
          $rootScope.hideTabs = ' ';
        })
      }
    }
  })
```
  这里表示在进入时，hideTabs为tabs-item-hide，tabs隐藏，当指令失效时则为空，就是tabs显示。

**3.引用指令**

在需要的**首个**页面中，引用指令

```
<ion-view view-title="d2" hide-tabs>

..

</ion-view>
```
  之前有朋友反应，这样的方式在三级页面中返回到二级页面无效，原因是，如果是二级页面中添加了指令，在三级页面中再次添加指令，会造成上述情况。这样的情况只需要在二级页面中添加，不需要在三级页面中再次添加，因为，在二级页面中进入三级页面中，如果路由在一个views下的话，指令是不会destory的，所以只需要在首个页面中添加指令即可。
  另外在二级页面中不能设置cache:false，不然三级页面也会失效，那如果需要设置的情况下，该如何实现隐藏tabs，那就用到下面的方法。


###二、设置路由实现隐藏tabs
  在tabs的项目中，路由一般为：
  

```
 .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

.state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
```
在account中进入一个页面，比如d2页面，那么路由为：

```
.state('tab.d2', {
      url: '/d2',
      views: {
        'tab-account': {
          templateUrl: 'templates/account-detail2.html',
          controller: 'd2Con'
        }
      },
      cache:false
    })
```
这样进入d2页面，会自带返回按钮，同时tabs也存在，但是这时设置了cache:false，那进入三级页面上时隐藏会失效。这时就需要通过设置路由：

```
.state('d3',{
     url:'/d3',
     templateUrl:'templates/account-detail3.html',
     controller: 'd3Con'
   })
```
  这样设置的话，d3页面就与account不在一个view中，也不继承tabs了，进入的话就是一个空页面，也不带任何返回按钮。实际就是两个没有关系路由间的跳转。
  
  之前会带有tabs和返回，本质上也是路由的问题，都继承的tabs的路由页面会。这种方式一般不会存在什么特殊情况的问题，但是就是过渡的动画也不在了，如果需要，要自己去实现。


----------

如果还有别的方式，希望大家能给予交流~谢谢