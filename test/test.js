import test from 'ava'
import alfyTest from 'alfy-test'

test('foo', async t => {
  const alfy = alfyTest()
  const result = await alfy('255,255,255')

  t.deepEqual(result, [
    {
      title: '十六进制颜色',
      subtitle: '#ffffff',
      arg: '#ffffff'
    }
  ])
})
