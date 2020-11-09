

/**
 * 职责链模式:
 */

function sendMes(obj) {
  var _beforeSend = beforeSend(obj.beforeSend);
  $.ajax({
    type: obj.type,
    url: obj.url,
    sucess: function (res) {

    }
  })
}

// 发送前处理
function beforeSend(fn) {
  loading()
  return fn()
}

function beforeHandle() {

}

function afterHandle() {

}

