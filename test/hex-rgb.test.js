import test from 'ava'
import alfyTest from 'alfy-testx'

test('foo', async t => {
  const alfy = alfyTest({ keyword: 'hexrgb' })
  const result = await alfy('#fff')
  t.deepEqual(result, [
    {
      title: 'rgb(255,255,255)',
      subtitle: 'RGB[A]颜色值',
      arg: 'rgb(255,255,255)'
    }
  ])
})
