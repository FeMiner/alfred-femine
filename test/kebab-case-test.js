import test from 'ava'
import alfyTest from 'alfy-testx'

test('foo', async t => {
  const alfy = alfyTest({ keyword: 'kcc' })
  const result = await alfy('新年快乐')
  t.deepEqual(result, [
    {
      title: 'happy-new-year',
      subtitle: '短横线命名',
      arg: 'happy-new-year'
    }
  ])
})
