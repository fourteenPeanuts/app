import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/desktop/Home' //新添加，之后在下方的component: Home才会生效

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'desk',
      component: () => import('@/components/desktop/desk'),
      redirect: '/product',
      children: [{
        name: 'dataCenterMenu',
        path: 'dataCenterMenu',
        component: () => import('@/components/desktop/DataCenterMenu')
      },
      {
        name: 'home',
        path: 'home',
        component: () => import('@/components/desktop/Home')
      },
       {
        name:'product',
        path: 'product',
        component: () =>import('@/components/views/product/product.list')

       },
       {
        name:'productnew',
        path: 'productnew',
        component: () =>import('@/components/views/product/product.new')

       },
       {
        name:'productdetail',
        path: 'productdetail',
        component: () =>import('@/components/views/product/product.detail')

       },
       

      {
        name: 'dataMeta',
        path: 'dataMeta',
        component: () => import('@/components/views/data/data.list')
      },
      {
        name: '404',
        path: '404',
        component: () => import('@/components/views/error-page/404')
      }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/views/login/login'),
    },
    {
      path: '/db',
      name: 'db',
      component: () => import('@/components/desktop/desk'),
      children: [
        {
          name: 'dblist',
          path: 'dblist',
          component: () => import('@/components/views/data/data.list')
        },
        {
          name: 'add',
          path: 'add',
          component: () => import('@/components/views/db/add.list')
        },
        {
          name: 'edit',
          path: 'edit',
          component: () => import('@/components/views/db/db.edit')
        }

      ]
    },
    {
      path: '/connection',
      name: 'connection',
      component: () => import('@/components/desktop/desk'),
      children: [
        {
          name: 'connectionlist',
          path: 'connectionlist',
          component: () => import('@/components/views/connections/connection.list')
        },
        {
          name: 'choose',
          path: 'choose',
          component: () => import('@/components/views/connections/connection.choose')
        },
        {
          name: 'edit',
          path: 'edit',
          component: () => import('@/components/views/connections/connection.edit')
        }

      ]
    },
    {
      path: '/criterion',
      name: 'criterion',
      component: () => import('@/components/desktop/desk'),
      children: [
        {
          name: 'businessterm/termlist',
          path: 'businessterm/termlist',
          component: () => import('@/components/views/criterions/businessterm/term.list')
        },
        {
          name: 'businessterm/wordlist/wordlistadd',
          path: 'businessterm/wordlist/wordlistadd',
          component: () => import('@/components/views/criterions/businessterm/wordlist/wordlist.add'),
        },
        {
          name: 'dataelementlist',
          path: 'dataelementlist',
          component: () => import('@/components/views/criterions/dataelement/data.element.list')
        },
        {
          name: 'range/rangelist',
          path: 'range/rangelist',
          component: () => import('@/components/views/criterions/range/range.list')
        },
        {
          name: 'range/view',
          path: 'range/view',
          component: () => import('@/components/views/criterions/range/range.view')
        },
        {
          name: 'range/opreate',
          path: 'range/opreate',
          component: () => import('@/components/views/criterions/range/range.opreate')
        },
        {
          name: 'range/opreatepane',
          path: 'range/opreatepane',
          component: () => import('@/components/views/criterions/range/range.opreatepane')
        },
        {
          name: 'range/codeInfo/edit',
          path: 'range/codeInfo/edit',
          component: () => import('@/components/views/criterions/range/range.codeInfo.edit')
        },
        {
          name: 'range/viewtab',
          path: 'range/viewtab',
          component: () => import('@/components/views/criterions/range/range.viewtab')
        },

        {
          name: 'model/list',
          path: 'model/list',
          component: () => import('@/components/views/criterions/model/model.list')
        },
        {
          name: 'model/edit',
          path: 'model/edit',
          component: () => import('@/components/views/criterions/model/model.edit')
        },
        {
          name: 'addelementlist',
          path: 'addelementlist',
          component: () => import('@/components/views/criterions/dataelement/add.element.list')
        },
        {
          name: 'standarddatalist',
          path: 'standarddatalist',
          component: () => import('@/components/views/criterions/standards/standard.data.list')
        },
        {
          name: 'standard/manager',
          path: 'standard/manager',
          component: () => import('@/components/views/criterions/standards/standard.manager')
        },

      ]
    }
  ]
})
