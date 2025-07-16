---
layout: layouts/page
title: Frequently Asked Questions
eleventyNavigation:
    key: FAQ
    order: 4
---
{% for item in faq -%}
    <details class="faq">
        <summary>{{ item.question }}</summary>
        <p>{{ item.answer }}</p>
    </details>
{%- endfor %}

---

If you have other inquiries, please call or text {{ site.phone }}. Alternatively, you can email us at [{{ site.email }}](mailto:{{ site.email }}).