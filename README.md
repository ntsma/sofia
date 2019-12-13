# Sofia
Sistema Online de Fortalecimento Interativo de Atenção Primária

O Programa Telessaúde Brasil Redes é uma ação nacional que busca melhorar a qualidade do atendimento e atenção básica no Sistema Único de Saúde (SUS), integrando ensino e serviço por meio de ferramentas de informática, que oferece condições para promover Teleassistência e Teleducação. Em relação à teleassistência, o Centro de Telessaúde do Hospital Universitário da Universidade Federal do Maranhão (NTS HU-UFMA) é constituído por serviços de Teleconsultoria, que prestam assistência para ações de saúde, procedimentos clínicos e questões relacionadas aos processos de trabalho. Em três anos (2015-2018), o centro utilizou a plataforma web do Ministério da Saúde para oferecer os serviços de teleconsultoria oferecidos. Posteriormente, para uma melhor análise dos processos, o centro desenvolveu o SMGT, sistema de gerenciamento e monitoramento para transformar todos os dados em informações analíticas. Mas, a integração com essas duas plataformas ainda era feita manualmente, com o download diário e o upload da planilha digital para atualizar o banco de dados. Assim, em fevereiro de 2018, o centro iniciou o desenvolvimento de uma plataforma própria, chamada SOFIA, e lançou-a em agosto de 2018. O objetivo principal era ter um ambiente de sistema dependente do centro (integração total com SGAT e SMGT), melhorar a análise de todo o processo e desenvolver novos recursos para uma melhor experiência dos profissionais de saúde registrados.

A Sofia é uma aplicação mobile capaz de lidar com os serviços de teleconsultoria oferecidos pelo centro. Além disso, ela é integrada com todas as plataformas desenvolvidas pelo centro, criando um ambiente completo para os profissionais de saúde cadastrados no NTS HU-UFMA.

Installing
----------

Install and update using `pip`_:

.. code-block:: text

    pip install -U Flask


A Simple Example
----------------

.. code-block:: python

    from flask import Flask

    app = Flask(__name__)

    @app.route("/")
    def hello():
        return "Hello, World!"

.. code-block:: text

    $ env FLASK_APP=hello.py flask run
     * Serving Flask app "hello"
     * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)


Contributing
------------

For guidance on setting up a development environment and how to make a
contribution to Flask, see the `contributing guidelines`_.

.. _contributing guidelines: https://github.com/pallets/flask/blob/master/CONTRIBUTING.rst


Donate
------

The Pallets organization develops and supports Flask and the libraries
it uses. In order to grow the community of contributors and users, and
allow the maintainers to devote more time to the projects, `please
donate today`_.

.. _please donate today: https://psfmember.org/civicrm/contribute/transact?reset=1&id=20


Links
-----

* Website: https://palletsprojects.com/p/flask/
* Documentation: https://flask.palletsprojects.com/
* Releases: https://pypi.org/project/Flask/
* Code: https://github.com/pallets/flask
* Issue tracker: https://github.com/pallets/flask/issues
* Test status: https://dev.azure.com/pallets/flask/_build
* Official chat: https://discord.gg/t6rrQZH

.. _WSGI: https://wsgi.readthedocs.io
.. _Werkzeug: https://www.palletsprojects.com/p/werkzeug/
.. _Jinja: https://www.palletsprojects.com/p/jinja/
.. _pip: https://pip.pypa.io/en/stable/quickstart/
