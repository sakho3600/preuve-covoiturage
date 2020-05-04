-- insert users

INSERT INTO auth.users (_id, territory_id, operator_id, email, firstname, lastname, phone, password, status, role)
  VALUES (1, NULL, NULL, 'reg.admin@example.com', 'Registry', 'Admin', '+33612345678', '$2a$10$iSm6l7.Yb9n.peL2Sgf8PumUujREjnwfCjL6orAcGN0Iowv4fqPeO', 'active', 'registry.admin');
INSERT INTO auth.users (_id, operator_id, territory_id, email, firstname, lastname, phone, password, status, role)
  VALUES (2, NULL, NULL, 'reg.user@example.com', 'Registry', 'User', '+33612345678', '$2a$10$iSm6l7.Yb9n.peL2Sgf8PumUujREjnwfCjL6orAcGN0Iowv4fqPeO', 'active', 'registry.user');

INSERT INTO auth.users (_id, operator_id, territory_id, email, firstname, lastname, phone, password, status, role)
  VALUES (3, NULL, 1, 'maxicovoit.admin@example.com', 'Maxicovoit', 'Admin', '+33612345678', '$2a$10$iSm6l7.Yb9n.peL2Sgf8PumUujREjnwfCjL6orAcGN0Iowv4fqPeO', 'active', 'operator.admin');
INSERT INTO auth.users (_id, operator_id, territory_id, email, firstname, lastname, phone, password, status, role)
  VALUES (4, NULL, 1, 'maxicovoit.user@example.com', 'Maxicovoit', 'User', '+33612345678', '$2a$10$iSm6l7.Yb9n.peL2Sgf8PumUujREjnwfCjL6orAcGN0Iowv4fqPeO', 'active', 'operator.user');

INSERT INTO auth.users (_id, operator_id, territory_id, email, firstname, lastname, phone, password, status, role)
  VALUES (5, NULL, 2, 'megacovoit.admin@example.com', 'Megacovoit', 'Admin', '+33612345678', '$2a$10$iSm6l7.Yb9n.peL2Sgf8PumUujREjnwfCjL6orAcGN0Iowv4fqPeO', 'active', 'operator.admin');
INSERT INTO auth.users (_id, operator_id, territory_id, email, firstname, lastname, phone, password, status, role)
  VALUES (6, NULL, 2, 'megacovoit.user@example.com', 'Megacovoit', 'User', '+33612345678', '$2a$10$iSm6l7.Yb9n.peL2Sgf8PumUujREjnwfCjL6orAcGN0Iowv4fqPeO', 'active', 'operator.user');

INSERT INTO auth.users (_id, operator_id, territory_id, email, firstname, lastname, phone, password, status, role)
  VALUES (7, 1, NULL, 'atlantis.admin@example.com', 'Atlantis', 'Admin', '+33612345678', '$2a$10$iSm6l7.Yb9n.peL2Sgf8PumUujREjnwfCjL6orAcGN0Iowv4fqPeO', 'active', 'territory.admin');
INSERT INTO auth.users (_id, operator_id, territory_id, email, firstname, lastname, phone, password, status, role)
  VALUES (8, 1, NULL, 'atlantis.user@example.com', 'Atlantis', 'User', '+33612345678', '$2a$10$iSm6l7.Yb9n.peL2Sgf8PumUujREjnwfCjL6orAcGN0Iowv4fqPeO', 'active', 'territory.user');

INSERT INTO auth.users (_id, operator_id, territory_id, email, firstname, lastname, phone, password, status, role)
  VALUES (9, 2, NULL, 'olympus.admin@example.com', 'Olympus', 'Admin', '+33612345678', '$2a$10$iSm6l7.Yb9n.peL2Sgf8PumUujREjnwfCjL6orAcGN0Iowv4fqPeO', 'active', 'territory.admin');
INSERT INTO auth.users (_id, operator_id, territory_id, email, firstname, lastname, phone, password, status, role)
  VALUES (10, 2, NULL, 'olympus.user@example.com', 'Olympus', 'User', '+33612345678', '$2a$10$iSm6l7.Yb9n.peL2Sgf8PumUujREjnwfCjL6orAcGN0Iowv4fqPeO', 'active', 'territory.user');