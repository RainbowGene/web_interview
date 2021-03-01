

const PENDNIG = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class Promise {
  constructor(fn) {
    const self = this
    self.status = PENDNIG
    self.data = undefined
    self.callbacks = []

    let resolve = (value) => {
      if (self.status !== PENDNIG) return;
      self.status = RESOLVED
      self.data = value
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          this.callbacks.forEach(callbackObj => {
            callbackObj.onResolved(value)
          })
        })
      }
    }

    let reject = (reason) => {
      if (self.status !== PENDNIG) return;
      self.status = REJECTED
      self.data = reason
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          this.callbacks.forEach(callbackObj => {
            callbackObj.onRejected(reason)
          })
        })
      }
    }

    try {
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onResolved, onRejected) {
    const self = this
    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    return new Promise((resolve, reject) => {
      function handle(callback) {
        try {
          const result = callback(self.data)
          if (result instanceof Promise) {
            result.then(resolve, reject)
          }
          else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }
      if (self.status === RESOLVED) {
        setTimeout(() => {
          handle(onResolved)
        })
      }
      else if (self.status === REJECTED) {
        setTimeout(() => {
          handle(onRejected)
        })
      }
      else {
        self.callbacks.push({
          onResolved() {
            handle(onResolved)
          },
          onRejected() {
            handle(onRejected)
          }
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject)
      }
      else {
        resolve(value)
      }
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  // race / all  loading...
}