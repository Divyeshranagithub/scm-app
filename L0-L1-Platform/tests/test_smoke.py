def test_health(client):
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}


def test_catalog_seeded(db):
    from backend import models

    assert db.query(models.Department).count() > 0
    assert db.query(models.DeliverableDefinition).count() > 0
