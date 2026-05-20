from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_auth_social_economy_and_omni_flow():
    auth = client.post('/auth', json={'isni_id': '0009-0008-5050-1539', 'quantum_signature': 'ok'})
    assert auth.status_code == 200
    token = auth.json()['token']

    headers = {'Authorization': f'Bearer {token}'}
    social = client.post('/social', json={'user_input': 'hola sistema md-x4'}, headers=headers)
    assert social.status_code == 200

    eco = client.post('/economy', json={'recipient_isni': 'TAMV-001', 'amount': 100, 'lock_days': 30}, headers=headers)
    assert eco.status_code == 200

    reg = client.post('/v1/omni/users/register', json={'isni': 'TAMVONLINE-ECOSISTEM-LATAM', 'name': 'Edwin'})
    assert reg.status_code == 200

    proc = client.post('/v1/omni/process', json={'isni': 'TAMVONLINE-ECOSISTEM-LATAM', 'requestType': 'model-inference', 'payload': {'content': 'Explica arquitectura MD-X4'}})
    assert proc.status_code == 200
    assert proc.json()['approved'] is True

    status = client.get('/v1/omni/status')
    assert status.status_code == 200
    assert 'metrics' in status.json()
