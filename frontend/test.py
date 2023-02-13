data = (
    'type': 'websocket',
    'path': '/ws/poker/1/',
    'raw_path': b'/ws/poker/1/',
    'headers': [(b'host', b'localhost:8000'), (b'connection', b'Upgrade'), (b'pragma', b'no-cache'), (b'cache-control', b'no-cache'), (b'user-agent', b'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'), (b'upgrade', b'websocket'), (b'origin', b'http://localhost:5771'), (b'sec-websocket-version', b'13'), (b'accept-encoding', b'gzip, deflate, br'), (b'accept-language', b'en-US,en;q=0.9'), (b'sec-websocket-key', b'vbb/1+qIh/afhEc4qMnsiQ=='), (b'sec-websocket-extensions', b'permessage-deflate; client_max_window_bits')],
    'query_string': b'',
    'client': ['127.0.0.1', 2147],
    'server': ['127.0.0.1', 8000],
    'subprotocols': [],
    'asgi': {'version': '3.0'},
    'cookies': {},
    'session': < django.utils.functional.LazyObject object at 0x00000264181A0B90 >,
    'user': < channels.auth.UserLazyObject object at 0x00000264181A0B50 > ,
    'path_remaining': '',
    'url_route': {'args': (),
                  'kwargs': {'pk': '1'}})
data2 = {
    'type': 'websocket', 
    'path': '/ws/poker/1/', 
    'raw_path': b'/ws/poker/1/', 
    'headers': [(b'host', b'localhost:8000'), (b'connection', b'Upgrade'), (b'pragma', b'no-cache'), (b'cache-control', b'no-cache'), (b'user-agent', b'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'), (b'upgrade', b'websocket'), (b'origin', b'http://localhost:5771'), (b'sec-websocket-version', b'13'), (b'accept-encoding', b'gzip, deflate, br'), (b'accept-language', b'en-US,en;q=0.9,fa;q=0.8'), (b'cookie', b'csrftoken=lTq5q5xxrEwVgdRqsZxmsTm3wae8DcTJ; sessionid=abxtp9luszwui435okpfjt597lxgsnvc'), (b'sec-websocket-key', b'oGT0zFvIVwKK8gNfxAmz6A=='), (b'sec-websocket-extensions', b'permessage-deflate; client_max_window_bits'), (b'sec-websocket-protocol', b'Arya')], 
    'query_string': b'', 
    'client': ['127.0.0.1', 8064], 
    'server': ['127.0.0.1', 8000], 
    'subprotocols': ['Arya'], 
    'asgi': {'version': '3.0'}, 
    'cookies': {'csrftoken': 'lTq5q5xxrEwVgdRqsZxmsTm3wae8DcTJ', 'sessionid': 'abxtp9luszwui435okpfjt597lxgsnvc'}, 
    'session': <django.utils.functional.LazyObject object at 0x0000028494BEF590>, 
    'user': <channels.auth.UserLazyObject object at 0x0000028494CB24D0>, 
    'path_remaining': '', 
    'url_route': {'args': (), 'kwargs': {'pk': '1'}}}


print(data)
