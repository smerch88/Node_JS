# Встановлюємо пакети і компілюємо JS в TS

<pre>
<code>npm i</code>
<code>npm run build</code>
</pre>

# Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)

<pre>
<code>node index.js --action="list"</code>
</pre>

# Отримуємо контакт по id

<pre>
<code>node index.js --action="get" --id="5"</code>
</pre>

# Додаємо контакт

<pre>
<code>node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"</code>
</pre>

# Видаляємо контакт

<pre>
<code>node index.js --action="remove" --id="4"
</code>
</pre>
