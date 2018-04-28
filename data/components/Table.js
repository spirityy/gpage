var pageOptions = {};
{{#each options}}
pageOptions['{{@key}}'] = {{this}};
{{/each}}
var TableConfig = {
  ajax: function(origin) {
    gh.api.gateway.apimanager.api.list({
      data: {
        page: pageOptions.number,
        rows: pageOptions.size,
        path: pageOptions.path,
        url: pageOptions.url
      }
    }, function(rlt) {
      origin.success(rlt)
    })
  },
  pageNumber: pageOptions.number,
  pageSize: pageOptions.size,
  pagination: true,
  sidePagination: 'server',
  pageList: [10, 20, 30, 50, 100],
  dataField: 'data',
  totalField: 'totalRows',
  columns: [{
    field: 'apiName',
  }, {
    field: 'path',
  }, {
    field: 'serviceId',
  }, {
    field: 'stripPrefix',
  }, {
    field: 'url',
  }, {
    field: 'retryable',
  }, {
    field: 'enabled',
  }, {
    align: 'center',
    formatter: function(val, row) {
      var buttons = [{
        text: '更新',
        type: 'button',
        class: 'item-update'
      }, {
        text: '删除',
        type: 'button',
        class: 'item-delete'
      }];
      return util.table.formatter.generateButton(buttons, 'apiManagementTable');
    },
    events: {
      'click .item-update': function(e, val, row) {
        alert('update event...')
      },
      'click .item-delete': function(e, val, row) {
        alert('del event...')
      }
    }
  }]
};

TableConfig.queryParams = function(){
};

$('#apiManagementTable').bootstrapTable(TableConfig);
