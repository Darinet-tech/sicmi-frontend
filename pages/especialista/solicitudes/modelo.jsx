/* eslint-disable react-hooks/rules-of-hooks */
import { Image } from "@nextui-org/react";
import React from "react";
import { Layout } from "../../../components";
import LayoutEspecialista from "../../../components/especialista/LayoutEspecialista";
import { useFetchUser } from "../../../lib/authContext";

const modelo = () => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Cliente" baseURL="./../../">
      <LayoutEspecialista>
        <table
          className="ta1"
          cellSpacing={0}
          cellPadding={0}
          border={"1 solid black"}
        >
          <colgroup>
            <col width={108} />
            <col width={44} />
            <col width={44} />
            <col width={44} />
            <col width={46} />
            <col width={59} />
            <col width={40} />
            <col width={40} />
            <col width={40} />
            <col width={99} />
            <col width={40} />
            <col width={40} />
            <col width={40} />
            <col width={148} />
          </colgroup>
          <tbody>
            <tr className="ro1">
              <td
                colSpan={5}
                rowSpan={4}
                style={{ textAlign: "left", width: "0.9752in" }}
                className="ce1"
              >
                {/*Next '
      div' is a draw:frame.
  */}
                <div
                  style={{ height: "0.648in", width: "2.4634in", padding: 0 }}
                  id="Image_1"
                  className="P1"
                >
                  <p>
                    <Image
                      style={{ height: "1.6459cm", width: "6.257cm" }}
                      alt=""
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAACICAMAAAGJlH0qAAADAFBMVEUfGhcgGxghHBkiHRojHhskHxwlIB0mIR4mIh8nIiAoIyApJCEqJSIrJiMsJyQtKSYvKigwKykyLSo0Lyw1MS43MzA6NTM7NzQ9OTY/OzhBPDpCPTtCPjxAOzlFQT5HQ0BJRUNIREFLR0VNSUdOSkdPS0hQTEpQTElTT01UUE5WUlBXVFFZVVNbV1VdWVdeW1lfXFpgXVpiXlxkYF5lYmBmY2FnZGJoZWNpZmRrZ2VsaGZua2lvbGpwbWtybm1zcG50cW92c3F3dHJ4dXN6d3V7eHd8eXd+e3l/fHqAfXuBf32Cf36DgH8OG40PHI0RHo4TII8WI5EXI5EVIpAaJpIeK5UcKJMhLZYkMJcmMpgpNJotOJsuOpwyPZ46RKE+SaQ2QaBDTaZKVKlMVqpTXK1cZLFfaLNXYK9kbLVsdLlocLd0fL15gL98g8GFgoGHhIKIhoSIhYOKiIaNiomPjYuQjoySkI6UkZCWk5KVkpGXlZSWlJOYlpSbmZedmpmenJufnZygnp2ioJ6koaClo6KkoqGmpKOnpaSpp6aqqKerqaisqqmtq6qurKuvraywrq2zsrGysK+0srG3tbS2tLO5t7a5uLe6ubi7urm8u7q+vLu/vbzAvr3BwL+FjMWNk8mKkMeUmsyRl8uan8+eo9GgpdKlqtSprdaus9issNexttq2uty6vd69wN++wuDDwsHCwcDFw8PGxMTHxsXIx8bJyMfKycjLysnMy8rNzMvOzMzPzs7Qz87R0M/T0tHS0dDU09LV1NPV1NTW1dXX1tbY19fa2djc29rc3Nvf3t7d3dzg39/DxuLGyeTKzebO0OfO0ejR1Ond3u7Z2+3V1+vf4fDh4ODj4+Li4eHk5OPm5eXn5ubl5eTo5+fp6Ojq6enr6+vs7Ovt7ezv7u7u7u3w7+/j5fLn6PPt7vbq6/Xv8Pfx8fHy8vL09PT29vX39vb49/fx8vj19vrz9Pn5+fn4+Pj6+vr7+/v4+Pv6+vz8/Pz9/f38/P3+/v7////9/f5/xOBBAAAA/3RSTlP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBm/IpZAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXRFWHRDb21tZW50AACJKo0GAAAgAElEQVR4nOxdCVxXxfYfyIVc0lxCfUakaaIoiXwMJcUETQi0zWwxy7K9wABBDTCBxDRyIfOhlra9bNPMssQ2ey8ytbLM5WmKWraJQKVSIKc3Z2buvTN3+S3+gx/y93w+/O7cM2fmnO8sd/aBAKMfXgCPieBPIiMvgkzyLgQG8TIEDeJtCC2IFyGA/MxC4M92wdGJOZHRjrmbYVL1oa5tWohfeIgYIgICLCCaCyCT/h7lb2gYC3FSU2sEYU7pHR/pLAhwMAITNwbIIeEUssGc3ReIlsjwp5YKWnSak5ylq18ATDUPAr+wEDuErCa924iC+XQEEYSatkNP6WVGkHIDfQkPQvQgADfpaUy0hNWd6/B3LyEFIKLQ1XpOpxpkbWhVcTzApmqohtJh3OMIZEILGAUpx6J2AeyrmQoQCvMB8jUtz2/3Tgsvyw94EYSHeNELLTzEVi8Mq2UhvvY8BBAW4icvQvAgf443aiZm+U6W8Sn4Mws5kViiI8knDAgLAmOlumwuyYHGO2NNwyBwlVz7SRr+/oMFCZGi0B5U3z2ibhn1RaqQRC+EouJpFVkPQYOcbUQaJtVjHuZICQ8Ccginqg/iQ6HVGimEBT3/XUQ0Wb2+qGkM4Ed0Jz5iuGD9VrFjx0thMHUUATwFcBwqYBAEhVJGMqQlQQQUdymjL2sApg6eOQI2apAYjU7U6C/vNbuxi/1uS5Ro+d+tgylZLqt45W9XIX0rOG2rAxXG14XRD3WiQlHyG0zQnF9KEpEJ2QsXz8tPHdB/aEJGXmFhXkbC0P4QGZ85f/GC2akRXGgGlni/Uub2o85SLXRAE1Tysl6kbrQFdFypGvTlGH1UyRWmj2BS382Un8Nt1+UNJADXGIBUqLKSUu3FT+fuMRshha3W2k/2YYExmopaS3qa4gjSHCeYo0SNlsUaJl4Ga90DqX/ItP1lFIOV6PUulcpNj+9ufFaRaqgjL+PKnn4qUEqdjC+r9llKllpIVPGbVNR006L1GAYR/RNKOtqkppGm2WpvDjQoAD9KKr5ySK0sE1dVomcYdZ6rC2wyJL4xNExS01iLaJcWYUuZi8+Q8p1deP/zaZoTpBZySU85BqgHIs8k1j0RaD+0DVU27MOQUNoWXME0R10MAZ2hRxiE05dwGDIQJofBo/Ad+pXDlW0gKQL2QzRtVCLjYCAspF2zJIChPTAUJA1oC1nASwvt1cEGkVUDLzxOf3vMA+yUE6gFfIVKCIIMaAUpAFNgLsCsfnFAq3MLgIepbwItAv4s4Q9VdwAIgRNUP6UMFnsIbcpETmSbmsaVK16tmzzRHC/oKXhXXSlZJedTHSlJrFMdpm9X3ehQvl11pcPcxteJDqrkZJ3rUDsSdaRDVVJHOoBMqnsdYrwldNipGzQ8LX/pwrmPxMCgkanZBUsLslNjIyFjGOUWzs2J4UI1HbDViGTueOq6UAud3+uoosReh9FsFRntKVEbswHoCMfW/QB8RMg5EXLD+Q9ZiYMOo32tpn8XS428NEAi/szRl8B+0Vp+y70CRL/LjQ6M4kOrRvqcbvCChfMRNk8COBugyHMlox11WHoS801cpQmvJWS4Oak1JWOcdVTadxB1R57iH0vfSvS3t1ne7afSfyQmXu2sg45p7ZRkytok/xylb0KaoXd7VhmvV3QYRXq7jlgL+YSc73oxyzEnEGnB3C2o7PmEd1PHQ60W7Riw1H8qNDUrZWC7MMVs+hySnTKoQ5Nsc6eKawlizmyAnUKJ8YW8VtGxQ0188RKvcv3MSmCqntvGmJwYo9LrwOZj6SbfA2y6h1xJlp6kbPJPjH7G2ekYaaukUOem2fVBufV+hkYmcgON9GY7HWrhecOmvlNXgC6wS+PtBKX0cfeqxAmKjhsko640pQN3aJ/AQOreJ7yBLMYn/VhCOenFmZmGEiQrDDDK6mNmJYwuE1rIGzAfxySEBFbToZcfgIGf+hYbSl4RGiZKqbtRriUoz0pyrcYtY+y2/IUO787DJ+ZFZ9JDMRPqgepHSWLdUz0hAczL9qv7Qmx5bPeKbji+2BhdQoc+tSHBAV3DcVwzdc3cXByyZLcBNq8JmQ9BFUD64lCYsxrfu2bGpcDb0Z/hoCnrIeSE5eC4pEwUdJJVdmhO+TyyBlUdDsShD/jB4gMVqH/GsUD4ZzWbP6DFJYwOgWIuGPB2NW/3aGliPj1xFqQ3is/bUgG8wEHNLmyuO2hICLShrWcOTC6HQ3T8dIDyJkNka/qYRv+OsdhqAA7vGszki6BbEA0+APi4CppHw1Ae0zQY1gxQNBUKAC7bg7w06IXKbPPkmbFyvt3/m51MQyMzEKcB9/0+sc4LUoCMdUCR+IyPrPOCDCDLnVAkPutD+zwmDcgkRxgv+dQ+j4kD2eEI4zUf2+cxMSB3OMH43NfmeU5G19FK3/jaOG+IOFaPHb42zTsiynS2QT/72jBvSZ0b0uhXX5vlPdkB+YPyb/O4xhAzXV5mYTFqAtDOzAs04pls9uNT7BAksVrY6M4Szi/MBuMOlpu8qDFCRzNdG3TgT78A/tQWP+bpsi10WTFVs1S8BvF1KzgcIKyei9yBnNmUkKaK5nIiDXjIK6rB2KMd502NETNfg5whWjS3M8kJ4N0VZluxCEZa6qyBLRWJZSL+77iyn2WDkXO9BcbvzjAAWputNQMJMxgDOKdSkYqyR6dH8JGD4iFq8ZTqyBh8v9YC409XMDRrO9r48GkVUmOWtZviIfk2EcziXids9bYhpFsHKT4CD3B7r8K3MRYY7rYuzOVxfesIUTJ7L2fMsRHKsov7Mi3Nz7eN/HH4nnunciAsS65D92gLDDcoDEN6dG7nZ7K7ymKi+P707NruLO4qha7c0dZl5FaoxyijHJS0YksyY9FlQTEaubUWtgqQmKiL7tPXUo7MskQD6zh10FQV16hIe5nCPXaC3o3/y2IrqzEnbUAoOGKcDeE+bQzGAs75XpIJcQME4H0bJNKcMee30IFYTL0auX/Yw7jdYm0TGwvWcK/3zLKK0YJl96mQqJ8GJJm9+lNXgCAjThHvXYqprKj9bg9D+Yr9m8ezzka7ucpoVqfJQhe7zRFO33KxYgm8QhdJQ12jFbwRX39ygKGOUM52V7KkRi7MRva4MOQTd0jYdwK3rX4gqoSqhiiTD/cwS29B5w8OMMydSR7LeTaaI7jXHhuVMr0juGtNwd/TNykagVvR56XE1K505+EjTdNBN9+Kv9vtUfzLYq2oq4+uLpwzIz2qWzPpM2oxO40zLl+zaO7MjOgerTS/5kJysi75n6boh33I3YITjAI4L9jEkhL/0RRZi8U2OxD3WcQkaw3SdzXF8vemLmTf0nyKLF7+AE+pnKl6HA42hDrVs6+fv3PiTTfeevez9TXefX9BemxqrvLZOD4/Y8T0wjLPwtfLNHZ90BkgDY0aEZDKXMBt/vQDGQT9aT8NsQ0CbHzYroOqKUwOt5b1ARDLgzj4ZOciADeEAbCuYq8qwDWRTFz3uOAEWx0JhCdwNe5TaAntecgrksW6yZYCCKKPwt1wUTZtLaGYjnqXGLF3B+AjMr7Icg7GCYu/A9obqnmYsbTx+2VRAggOsJKhHQx9ogaC6SiodD3qZrvWHp4CSSNjESSgdYNx55sW+6xjAGUzcMVGKPuQmdEEMtce/KSawDocUO2DCJj8WTTM2r9wM/pWRsWfzewHaMYLw7qPN2GK5fI3fiYEMfeHUUyskG1E+HcF/dlEZQ4nQerIWL69MZUmANRExp8rgHRKjoYhsL6SOrPLOfi0NT2mjDzU/I0IwG0a2HDPSc2JXEalU9hmlyz6SSSpMdAuZQhlDadpOHt+OGTNKY3ZDE8CTZQtC6C2w+q4csDPae1jaGVB0tpLcA/G+0sgKm9hKFxO+x0l79NEwryPg+reybHrps7E3sfM9JkRb6KuYahrXsLacFy4SzgCZUNSB0JXysO/pmsioGQuFpfSvGVvOteRk5+/uPy5l7a6Gec2ILIDsk2ZRB1fNxsf/26yAPn9dmsH5drXfWGad2QC8ovT6ptvrPOCVCC3OMCw7nFvcCQDeckJRsPPDwWIY3acDjgkINbJOUGjfWie56QBcZpqEPNCDZ8EkD9PdxwaEEccV/nWPM+JA7GuiAi62sfmeU4MyPNOOK7ztXmeEwPihON6X1vnBSEQ68Inp7G+Ns4bIurRNJlucB+6ARFxzJCbfG2ad0Scash4X1vmJRGHDWe3+Nowb4nY97Em+Nour8l+L8qtvjbLeyJ2awgT3YdrcEQetOK4g/J/tnCdWpUBQ66YPDWnoKiocH7B7LyMhKh9gyKihsclT5meM3v+4qL5s3OmT0mOGxY1IAsgfEjs5IyZBYuWLJo/b07e9ISoJXJMGyP1ZYTO0gaCErGs7T/Fan3XQP32lRssFt8NYLOJy6lV+diyumG7ykfYnhGrrE67zTuHmu9l/LdkXq6qe5QUhXUL/p1gt/Tm2KpM9xgIwIeOQD4Wa6fEr1t0X3/uZFto+C6NkOhu7OlvyhBXQO6hzK8tOJxblVCuNUC3rY12MkPbzKRtgALI4A5pG4CI5Dzx+qR4Z+t0eHkBrrURnjX51PWZopqHetMeyL1gt4boolURybfL4BxTEkw/kVMN0JtzZpuiKBUwUgxWGQfZQc614dLhHiR+IwwZbAsEL875yoJjgjMO+8VaRvu5T5zBEeXHNLdUQixpAbCFZAI8guz9hqpSJZxWGO2APEM5li11rlsVZyC53GezG1ktP46o7Hmg1gFK6r6ETLV4KkDwqpStFhy3gwsSFSLUxqufxWzOaK6KEQtejQqdkkgOpwOZaFiMm/lft+CY5BQTI7GMvNRZk8EQmzYTFClxSmugTQQdXQHppgPhusmzusV4TdSrFhx3u8TBLtJw0MZ9WhmMPM7ZJAtpGxOdI+hlqxcLJL/DhAzgwnrTh6cSVlpwuLvjoIk7O0YajD42sgLHU84RGIfoZKLfjRFKnuudRrzn518WHPe6weGirq/nPq73OT3lHF6qBUUWrywWxk8Bch2zGI9XvGDB4f5AEo+qn42PdU8aZyiNgbB0lGsg1q2mhJ1yHqwAYeavos5nLTgedItDfDs7B3UU7XiQ7mXdAsUZ7YLPa8Vd/rqt1baRy3uw2yh7grryTbKiH1bIgWDZwl1YKyw4VqDAgxa2PK09lZhovTk9De3vmWXTtT2JDl+mGkX6ccNDv+FGKg+UMYFdUmU1mB2tut8Gh3RvVhezceb0DzcYI82y34LIGqetgIsVcePYOdG+IZJS+vMrbgB6wGItu7TvXjsc1k2ms2dMT02O7ts5wACyR8p2TmKPPB2fpCUPD+vainZVRPDp4EBqd1krgKl6gqlA7A1mZ8TuscWxygwk2MaGdO5Va5a125zpYidgTwnIRUYo0QD34h4ndCBWg1npudMWxzWGmipzphvUyWI2Z8hNuFYJXK1Qlrc1kHBOB2NDm+jOZWtAnrMYyw673W2LQ95lPodHVGFjgCX9xU5RuTOzzyaTrLRbBVJMHc3Eblmxj1DbFmPd2s+uqHQ4C/eypKOnsyHcR9rVnmIjKwysBNfUXQZCbEgHYpoT+gJZNhsHkJS+sHOKHuY+0i7fds5APnADBM41woa7BqIMbtkNaBPtcdxoY0gnG9UPcy83gxHBu9wdEN7u4oU12IN+1/C4kEew1lgMle5ZY9eJTLDHoa6YnODRJNmodqrr3RSpNs5ZqhKTwgHiWep4RswChEvL019qtrILWR1m6Mep0c/m0Wxw0ixbuIszpilSxULM7viJ/yHDzUbN+Kl6hD4PS0JbdD2GKrFMwq5VdNg7YB5jBTunpwVIkqWsIYn+61kqF97BT3Om8c4+Knt5tF0USRsg/KwbOxZ2sz0OywFk54IhJhSCDE5TW9kjIopAhRtMWM9Wfz+IInhUIdASgwj/sbqpZhW/ttd6eI8VK2uzJWJZV7QgNzO+X0epFytOFSVYZZctyM9M7t9JO7mnbcP2P6pLDiF4BQXlXSAYn6JAH+CHI0wDRqJVEpvktE6iItncfrqOmMkc/9M644STrH7SpVnqf6FyXbzw43fqTD4A5Xls7i9Ni9VkQ0ctNisQux1b13xhhQFwidm2ZmYgVTojyyxrKO5s8RplbvZasUk/POjXE1Qa5gwEfrtPRTHa6UJdiwFarw4OmY21Hm6V/GqHyfxOixgz1eD05i1/hRqK00Ih86bDJ/zP1x6447Zxt9x+/6t/OKD4m+ng0zlJCdPnHZB5xblJk/PtTgvZUSPaid1I6AyQhkb1cWlUPdC4RpQjvjbg76JGBCR+QHfYgheFbS6CtjF42GVgDMB5YTGQloJ3rM9kcm1iB18BsCEs5Hs6hA5t32dhaZ/eH+PBmeKwkMOwdsS0IKiOKBj2ER66oNQZDs2ljwR2wmY6HMiHo1FZwbRPiVPrG2Ko9KUAS+Pz8RQNHrqMgJCIC+FAUmcM3DZ2UDzAmv69cFKjfHBWcFUFztPEQNfkS4DFh5SSMpQ9IzQg2EGKwQvQLsD/kFJYvn4nDISyOQD/ZZMjl7K48fRKTR+IEvBD+AGYkkJg/7ZgBB6xO0FRQUYlhJ4AeKIlsNHEPuhZhKhSqvbwEVUJDZlyiCuOxlABUIxHlotY0RBDDbxErT/wOcp96fj7KHarN4EflNP+SyQ7d1Mietr7ozQgbau+g7BWNHhHzJiW1LJPp0JGVRlUYLwfMqDw3SwmS6pYH2LXQoDWNBieikEWO+OKF7HCoYJaSIGajWnssMo/adeDjjQugdYgDlivWVgF/GR4O7iQPyKqgilgir8MWrJTuN8ukHQ106ABHZfH7AvHf//CFuCPiMvn5hYfEEDwooFF+TVF0ApGYe+MFBWI8lHjDxAWjxZBGuLvAWL8g7do4sgZB3Y48zCSx0RpVkU++EPohr3sCFQw/ouJVrAatM5pr7jhuTxbK9MrsnioIJi9Nh1K2T2PMdhhZIOYUI5ThPNnpeCTEkytfvFBjFfFvPrHDeeHY0khLaKV1ZD6JjWnGS9E558Q4WOhG8C7OKHZlsVdzU+aMhCx9O9sgGossAwfO6fbnpajQclYAXAglItl8NMUPHzGsuEtVnzYmaisI6xQbiiBGQAdgkEc1Z3DY4WLoZJPX/LTvzhl8TAMB+gNtIe9kR0HB7yOEgtYaw6kz5SR+6ei+Us/YClck40J0CV56MGEx4uX4IACJ2tIXmokTe/k+CdFAr0Rm5ALF10xNO+huELY3fsdmklBn62NwGw7UIrpED9tUSo/RtYfVr9LASzOfSKVJfG+Hm8nVdPSuDDrYHIxlOLQMAVaTxkJAWvYDcVUF8WYlRrHFqpouMchdcpiivSsOZduXosjE5qnu1Ie+4jGNYyXQvDq8/vXNy/eO+EqpUG9dsJdz6w8za59auDkUYbsWO60M1jPmTuePe3usWqY5C5Dfl3huP3fSuOX/1gvRjdmcpUhf6ywXuvkmu5v+EfjGjo5ZsiP9ougrsj93oIz5JbsM+T3+9wnv5lW1LPljZTsMmTlNe6T30zP1bvljZQsGVJtv+/EJY1+3hemN04yZchvDsvqrmiM9XqnM3TKpGRIrfcNeeJVK31leuMkOUNWOZ7Id6RrT48bRk4jMjKk1vGCcke65jS4JOV0Iz1DdlznbXZc78W/fz5DnpKWIa95mx1jbTdynKH/K4kMedHL7Bj3letoz9CpEs8Q61ERl3Tjdh9b3YiJZcjrXmXHTV/72ujGTJghX3vT3R1fV/9m/QwxwgzxYnR+25kFjzom4k0DMuEnX5vb+InASU8HIBN/8bWx/x+IwMueZcft4l/A/P4Npa8YbfuS0ReCPue0detWmy3zpyMdeTc/PWl4ZN/unbr2Ch8SN3Odq7vRv188eWj/7oFBIQOi05726BL1mj14+3HVHpVLXPyHPYkmif9H+bPD4SSZvByjHPUj7qhjrXZY2UMqwIh7upf71NaiE0/HtncM4h8yfa9JfEFvG7nmQzfZRq7TYe1gwNtqhlR5kB13ixuXf3C+11Qnr8cohe7T7Un90JRnhJvC9FNBLmiE1ZriS/w9UBCwSJM/GO2iPKW7gP1JE03qMjVDHP6FhUT3nOSiOxyOWMl0CmOUGPf4K7R/LuEhzcB457uXM121cDTOlBltoxZot7KULxlxjuGhHa1a1lrjnD18PT/dc7ywj8ZTU1olyTp/5eYX8rqbJL5XHCXebn9STKFTGqMEKmkwD44d2vm/9q49KK7qjN8FTAhJgAAWqkiiCXkoTJpAJCQGYoJ1gkyN1jp9WB/jY8apJgRi1DGQCpg1ICQBUwySjI/
p2HY6g+QlLrDhIYtAM1OrZQORh5BYp7tssF3YFtwzPeeec+89595z917QmWYcfn+wy93vPL/zuOc736P9XM3RkoK9Ods3rbt1WVzUMtAUHH1z8pacF0prztm7B9xTIJNJ1Ay8o32O5tOVL+dvXbssOli04NrKkGwFk6N9HQ0nKl89sG/3j7ekJC2/IWbRAFUN3y52qMeWad00OIi9KYkhflZy2hSkirZVKWa1PUCj8+ii9tO/CPpeohEkvZ7P+AZvDGZ3RulkusEgSpKMCDqR2kwM43omY4MFvYcdFpE1OnSeZYJkjDspRagSMjRkA5BV2QGKS2FKYyyahQsBuljS6/mrbpxjBY/N8oxSyNTtgLlEp5hEFTySjxiSlIDZOVjDu9sCGdHXBFn60KcnRiLP5FC9IuzRz8J7o8DifepHQeuKTcJJQnLBhLrcY7OOJMq8Cy30GSdA2MEMZ652HrMocMOCSfAkMqSxg2Zq4FF42GRMzWBwsaAC7etC8Ot0t6TX8xcT58bHZx+kvZepWb7JVMxbaS6XhFmD+IsaxmG2c6oCkFLYpqR43Ziaxgec17IvlJ8FrrsZWa/nz/cZs+OJb2Pnuo+p2LBxAoRaJhHHrZvs9orgsH5erG105KC5GtCONEP7jekVFOFEu5liKa+fAkf2Luv1/Ekb61SDp75dVJh4ul6BV3oFm+hEfN9td9Mki6e5NBBTtG8rmJdZ3eS9TLJUngsbPjLEBEGN7L4eoxAIGk8UOyVXM+/t5LOAhnRGmS1amIZVm0vkYY4LB7k0kTTJDi4JxHQcU34c3yEZB6kCi3n5Rt50RPiWitRRV9Sz/A2ZREAeKSjIej2/N3FJ8rRRUF1D7KJrxYtlzEMxnSiEOzrZ5rbr5ZTEkC126dFpkCNoseasUapLeDu/TZyHzFhYJ9Og+xDFuZSs1/OuNhSwBs98B7YHvN3ZP+4a6OpoPnfi2NHSogKvNtEKOtEWbr530CSSowmva8jZaT9Xd7yyrLgQ+dPNFxjM4HWpi8MQiKDtgXbBOqaZrLOOPokIMeQrsnPLej18P/EsTsrlnHxAwv33cbAT496dz2irWMtpFAvOK5SDITjFa/rVEJ3sZCRqMuL6StXFa7o5L3XoJCHemKR1eYxZeGVHxuKd+gXUw7Jez0kT7FDcoDxrgloEz5PuJl6LaERwtmNmmeOFuZWDnQcA8i7FLlhGh3kVHJrThAwLN2453nZCFHal0WmWSMsN1jp5V5GZm+hgRdndz3U1ycXDnP1mzFCyuorTMuZYzT+5GEvex1Sht3kCEAPUhPGzhpj3gZp4HG8ZkVR08GNMkkrylOhlkdsnMx2sKLt/MwOzHh4/pHdy0ogJze/jw0PaRGyk4F4tAQAfMyTva373jaIlmxVQmj0R0nDdqTuirCxlF3Y0H087jfWH0wluJU9pZWszHSy/FINvZqIq/yS3QczubOjzjyCN1wwWuTRJLJcEqF4oxDkzC/jLWCGmBMsgTUWE7T9i097FpCAu+hSGfPOUcb8qyu7/5fsv1cHb3Maw8j+buR5wMZIHtbN/DGZR07slcrM9GGGueB6u5HIWL3ofIY5/1cehBiZBOn6oMOTrh4y69X7Z7e1/TN37SnhAx7UAc5peyqfRgAmaEeThkbCLM2fVE6G6UQw3Wb4OypaoGLJb/sm3TMsuHrAPSnrJ0g3kJuLBCxLdv2ZmuMB53cUVZe7JTQre2fMU/011LU2iL45hr0C4PjlngjH2TeKI9LxvkTl+kAnEWFAFmCQ/kzVJvp6Z1dtDuh4eDtG1CTK5hNcxbeAKWvsYkjd4JCJU4o8juoRmQQtKZZ/vr+P/E+vP2Oztju7e/sE+Z2+3o93e2HCmfj5dgevE6a6yMfyUfzP4888kgq8emRE7HgyggbKKrs06fToGG+lEYVzZE3MTEqYrVwSnWYaYvawMAGrvKiWPsHdP0f0wB5uZGoi+fTRWuJ9obwcVzQUzWkAUAtqQsKGgSgNQUhhltvStRt2iJ1nBUKlX5AQgZVCyT4fLSskZ+MHU8sBZs077o9DhkGOn/iU7CR6St+R/mNACovBoYDdBTMwBiynVMnV0hjoeCatWxA1VIkF1VOfzV4O9ktNeNUrlnLLwg0vkpKG7P04vZCqAIojxPTm8I4t6fy1vAX83fAuj8ZNnDQTz7mC6KmsNOoHAz7zLLOAOVGZvDQ0sUFfNkUg9MRSCNy9YjKXwPiS8hSdXfVMeXWQ7ko6wxzjEBOzhFE0RPV8nXz+N5L0Py+z4mwktIAWPGyugsHfeVvXP7q6Gau077StMolRevvUMySb1z1f77LXU6b6NHaJCtPZYL6IvGx61VyE2DIobcfQlNYVLHgjJZBBIMjfuPCZQaQkWBPQG9O+3ZO3qT39hnhn3Pm1G/2QiVDCCpjOVWHUYxVoCAJIN841iJtab6opE5g0yGfYcSMYblzg/3JIC0pJXKTHIyHNyLhnkvmBaYtAJEAAe9oI93GfKgdkn5l1mPWHWFPRFw34TtFfVFSwBT47VaJyv+v3h8kYuWVgE+/885PVykh0SQlAkc0iPr5cyHZJS1wbuB5Va8PNmGPLP9540443m0XdmoJk1pWotBxzBOnsBfpOWQHu3ygFHKfIgKN0AAAagSURBVMJXFh84TUwe5v50UbgeSeQOagSdkJ7yItrRUA3MBePmfS5++cffPMK7Zf/pY8/+YcY6i50lR2sb4Dmpq7dvYGh41OX2jHvHXcP9XR3NDadrjx0pt76slb72Fx+tOdfR57o61NlYV2nlLfeeovLjZ1rFfPsHhkdG3WMer3dspL/L0Wo7feJ4Zbm1SPeVx+8oybxBpaMTuTKjRD0Rp2qzV9InuqCbs8qcLEl3eV3HiMtRV9Zq1BEDReXVp1t7RyZcTlGBtuV744P4+4I5hlxjmGPINYY5hlxjEN7iaYrM4f+DX0KGvP2rOVwzeGRuybrmMMeQawyzZ8iopFTrm52+Bg/TwxclOby7s8eM6jNXx/mqc0DSQFXUdf0jPYzu7niXQ1I80lGU9g9z9FgNytPBNHu9cJlRSB6jG4oYkkiiiZRKYS99iZYvANi3yAfAnhg/GJ9XBgu9Ed35LiXKOpuK4BMsNutYSFmbFgehksdzF7XAjwPzmZbux/ZR1cJFXMdwXFphKO6XyW0JSN8WNA2C0aRkMZCkbSGSlDbIYt10FJy6TpJ9rD+KIlcS08qNpShnWGpb3G4kPJzCFrYvhYgH/umcODGMcAc8dUfdDYA3I0E8fztjUFSMybBkLE7PzQNgYn6h+H18+SkALjVLdZ+PetyzIwJZtu+LoHqwPW7XFCmvUSDkd5SgQKVvIGVVrOnaHbFBTuBfB3vTXa/kUH4dLTwQkG0LiXm8stYi2qXaUtPvggmjUBDBnNWwy9Dtpiu6Esm2xT6DfdQlZbC3/kOLYgB0I2HYfnTjFMcq5sZgBiQRKa5VGBQ/YzGVzSLp7oEDwdK9RBNSgE61CSjyCOhbsysZfmwm6a+giDNZtVuikH6zG6liJt0Kf42l9O0m09y7kOaWI/gV+VkFrHqdfG/lthwCoKBob6jYBdEjsPBF2KyuZAkt/b+emHDmh0DGRFGaRRmxyqDLInpXE0gMtycB/nntJnH12H+8TdGmrg1i9WAyLhXSVp+QIemxmRkbX4QD7DmQiuZK1utONAgPC/fkbdyM7sZi161fcVDMJeWmzIzbkRXvYFJwPhI/j6fAai+XNYVrhY/wF6vgAtWWjMz09XL/HMV1ahfSMjelfA4nG+7Y31kyIZUXxMtaZAOKTlOTYAOdd4DdyO614IXJMDgMxyRuZVdApsQCcDb4IOzG55CaVxU4QUtXm7ORxoMdgNWURuqKdQBEyEp5Y5Ah/hgP6Fm8G4CaDNTYFZlbbkdjoz1hUYlEVikQYVVh8CQ4HAJrvAHL8OspW3ffAhJcPr8Yzf+NuZvXWBHVZCpcKm+7R6Zzrr7ueXmKObfATpxHGcYIYFC60VrdDS5Zmr5IdIG7kFVSolTr6mAPyApHU7yXbm467MEzIs3BcOmGYW0S/rwYWg4HLHuzvwovPFuXA9IUrKqXRBTEktLkOsoK4tMJ2wDIrAG+iArvmh5QgAxICpfh34ZRJ+ciWzDvLSt9t8AJeecP0BpxRi4wR+yrtRlwPUuSHzYIdcC/8CXp3w1rpoFVNKPdEOtKa0XLnnL15E+QlKtWE2UiRwicWiuoq95OSvv+EBnoY0jFzCpabd0NvzaJK3pFKL3LrJXuegrEO51tSv0gQ/ZE429nUUvzFsJR5QqyooWM8BskwSYBWwhcWXYQtUxkAHMlvh9s/634r8tCLvw+xkvBx8nbx9GAZa7KPhTEZVPMG2E9NkVrE8hq6o4X135wZQoULBkUH52Kga0dWgwXo7IFKfBvNDI1PhImrpb2tGl0y4VnfzHaSVyi+X5lBJ6jl93xWEpbarkM94MscR1yT4D0BPh5fD5e7Dtj0d3ID7GJbq0FdUsSjuLlR7l03Ez23mZcyY412ZOIpbSOZVVEGy4PZhAirnuOFFTWUrTGlUV2g2zM/ImQA0rfDd0wDPxNE3CvxlnVCe1gyjZFGHK++aPWxgYvcCJx/hTSyR+yw3KdktnRZMso+vCd7wFNIqkPOEpKGuBS1DNISDqJJn9/m91m7yeLlLOxtd3eKI83J674kPi0F0w1NLe3NrYQKuxSobvq5Sqck6e2uPAIzn2wR2wl4mULflW5aN1fjbXaRiQLAqSUPWzHY9B7ttRa75puIWu797zINGd1URXMxH8eV2jytLWgAu+DbqmhV+E67bXZYXUguz4sKm2RL86dYrvIEL+IamxT9gFY3sF6/P72+aH9VXiv8LQ2N7Qjdl6UOqCbOLppKzloQ4u9/00PaJde++yfA28NvoH8H6/b+gvatcdiAAAAAElFTkSuQmCC"
                    />
                  </p>
                </div>
              </td>
              <td
                colSpan={5}
                rowSpan={4}
                style={{ textAlign: "left", width: "0.5354in" }}
                className="ce1"
              >
                <p>MODELO SOLICITUD DE </p>
                <p>RECURSOS </p>
              </td>
              <td
                rowSpan={2}
                style={{ textAlign: "left", width: "0.3638in" }}
                className="ce1"
              >
                <p>D</p>
              </td>
              <td
                rowSpan={2}
                style={{ textAlign: "left", width: "0.3638in" }}
                className="ce1"
              >
                <p>M</p>
              </td>
              <td
                rowSpan={2}
                style={{ textAlign: "left", width: "0.3638in" }}
                className="ce1"
              >
                <p>A</p>
              </td>
              <td
                style={{ textAlign: "left", width: "1.3291in" }}
                className="ce4"
              >
                <p>Solicitud de Mat.</p>
              </td>
            </tr>
            <tr className="ro1">
              <td
                style={{ textAlign: "left", width: "1.3291in" }}
                className="ce4"
              >
                <p>Devolución de Mat.</p>
              </td>
            </tr>
            <tr className="ro1">
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                <p>[D]</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                <p>[M]</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                <p>[A]</p>
              </td>
              <td
                style={{ textAlign: "left", width: "1.3291in" }}
                className="ce4"
              >
                <p>Transf. e/ Alm.</p>
              </td>
            </tr>
            <tr className="ro1">
              <td
                colSpan={3}
                style={{ textAlign: "left", width: "0.3638in" }}
                className="ce7"
              >
                <p>ASIGNACION</p>
              </td>
              <td
                style={{ textAlign: "left", width: "1.3291in" }}
                className="ce4"
              >
                <p>No:</p>
              </td>
            </tr>
            <tr className="ro1">
              <td
                colSpan={5}
                style={{ textAlign: "left", width: "0.9752in" }}
                className="ce2"
              >
                <p>Nombre y Código Entidad :</p>
              </td>
              <td
                colSpan={8}
                style={{ textAlign: "left", width: "0.5354in" }}
                className="ce1"
              >
                <p>[UO]</p>
              </td>
              <td
                style={{ textAlign: "left", width: "1.3291in" }}
                className="ce4"
              >
                <p>Código:</p>
              </td>
            </tr>
            <tr className="ro1">
              <td
                colSpan={13}
                style={{ textAlign: "left", width: "0.9752in" }}
                className="ce2"
              >
                <p>Almacén al que se solicita:</p>
              </td>
              <td
                style={{ textAlign: "left", width: "1.3291in" }}
                className="ce4"
              >
                <p>Código:</p>
              </td>
            </tr>
            <tr className="ro1">
              <td
                colSpan={5}
                style={{ textAlign: "left", width: "0.9752in" }}
                className="ce2"
              >
                <p>Nombre y Código del Área :</p>
              </td>
              <td
                colSpan={8}
                style={{ textAlign: "left", width: "0.5354in" }}
                className="ce1"
              >
                <p>[AREA]</p>
              </td>
              <td
                style={{ textAlign: "left", width: "1.3291in" }}
                className="ce4"
              >
                <p>Gasto:</p>
              </td>
            </tr>
            <tr className="ro1">
              <td
                colSpan={4}
                style={{ textAlign: "left", width: "0.9752in" }}
                className="ce2"
              >
                <p>Centro de Costo:</p>
              </td>
              <td
                colSpan={9}
                style={{ textAlign: "left", width: "0.4181in" }}
                className="ce1"
              >
                <p>[CENTRO DE COSTO]</p>
              </td>
              <td
                style={{ textAlign: "left", width: "1.3291in" }}
                className="ce4"
              >
                <p>Reserva:</p>
              </td>
            </tr>
            <tr className="ro1">
              <td
                colSpan={13}
                style={{ textAlign: "left", width: "0.9752in" }}
                className="ce1"
              >
                &nbsp;
              </td>
              <td
                style={{ textAlign: "left", width: "1.3291in" }}
                className="Default"
              >
                &nbsp;
              </td>
            </tr>
            <tr className="ro1">
              <td
                colSpan={4}
                style={{ textAlign: "left", width: "0.9752in" }}
                className="ce2"
              >
                <p>Código SAP-MM</p>
              </td>
              <td
                colSpan={7}
                style={{ textAlign: "left", width: "0.4181in" }}
                className="ce2"
              >
                <p>Descripción SAP - MM del producto</p>
              </td>
              <td
                colSpan={2}
                style={{ textAlign: "left", width: "0.3638in" }}
                className="ce1"
              >
                <p>U/M</p>
              </td>
              <td
                style={{ textAlign: "left", width: "1.3291in" }}
                className="ce4"
              >
                <p>Cantidad</p>
              </td>
            </tr>
            <tr className="ro1">
              <td
                colSpan={4}
                style={{ textAlign: "left", width: "0.9752in" }}
                className="ce3"
              >
                <p>[CODIGO]</p>
              </td>
              <td
                colSpan={7}
                style={{ textAlign: "left", width: "0.4181in" }}
                className="ce3"
              >
                <p>[NOMENCLADOR]</p>
              </td>
              <td
                colSpan={2}
                style={{ textAlign: "left", width: "0.3638in" }}
                className="ce1"
              >
                &nbsp;
              </td>
              <td
                style={{ textAlign: "left", width: "1.3291in" }}
                className="ce4"
              >
                <p>[CANTIDAD]</p>
              </td>
            </tr>
            <tr className="ro1">
              <td
                style={{ textAlign: "left", width: "0.9752in" }}
                className="ce4"
              >
                <p>Destino:</p>
              </td>
              <td
                colSpan={12}
                style={{ textAlign: "left", width: "0.3965in" }}
                className="ce1"
              >
                &nbsp;
              </td>
              <td
                style={{ textAlign: "left", width: "1.3291in" }}
                className="Default"
              >
                &nbsp;
              </td>
            </tr>
            <tr className="ro1">
              <td
                style={{ textAlign: "left", width: "0.9752in" }}
                className="ce4"
              >
                <p>Solicitado por</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3965in" }}
                className="Default"
              >
                &nbsp;
              </td>
              <td
                style={{ textAlign: "left", width: "0.3965in" }}
                className="Default"
              >
                &nbsp;
              </td>
              <td
                style={{ textAlign: "left", width: "0.3965in" }}
                className="Default"
              >
                &nbsp;
              </td>
              <td
                colSpan={5}
                style={{ textAlign: "left", width: "0.4181in" }}
                className="ce5"
              >
                <p>Autorizado por</p>
              </td>
              <td
                colSpan={4}
                style={{ textAlign: "left", width: "0.889in" }}
                className="ce5"
              >
                <p>Recibido por:</p>
              </td>
              <td
                style={{ textAlign: "left", width: "1.3291in" }}
                className="ce4"
              >
                <p>No. Consecutivo</p>
              </td>
            </tr>
            <tr className="ro1">
              <td
                colSpan={4}
                rowSpan={2}
                style={{ textAlign: "left", width: "0.9752in" }}
                className="ce2"
              >
                <p>Nombre:</p>
              </td>
              <td
                colSpan={5}
                rowSpan={2}
                style={{ textAlign: "left", width: "0.4181in" }}
                className="ce2"
              >
                <p>Nombre:</p>
              </td>
              <td
                colSpan={4}
                rowSpan={2}
                style={{ textAlign: "left", width: "0.889in" }}
                className="ce2"
              >
                <p>Nombre:</p>
              </td>
              <td
                rowSpan={4}
                style={{ textAlign: "left", width: "1.3291in" }}
                className="ce1"
              >
                &nbsp;
              </td>
            </tr>
            <tr className="ro1" />
            <tr className="ro1">
              <td
                rowSpan={2}
                style={{ textAlign: "left", width: "0.9752in" }}
                className="ce2"
              >
                <p>Firma:</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3965in" }}
                className="Default"
              >
                <p>D</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3965in" }}
                className="Default"
              >
                <p>M</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3965in" }}
                className="Default"
              >
                <p>A</p>
              </td>
              <td
                colSpan={2}
                rowSpan={2}
                style={{ textAlign: "left", width: "0.4181in" }}
                className="ce6"
              >
                <p>Firma:</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                <p>D</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                <p>M</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                <p>A</p>
              </td>
              <td
                rowSpan={2}
                style={{ textAlign: "left", width: "0.889in" }}
                className="ce5"
              >
                <p>Firma:</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                <p>D</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                <p>M</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                <p>A</p>
              </td>
            </tr>
            <tr className="ro1">
              <td
                style={{ textAlign: "left", width: "0.3965in" }}
                className="Default"
              >
                <p>[D]</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3965in" }}
                className="Default"
              >
                <p>[M]</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3965in" }}
                className="Default"
              >
                <p>[A]</p>
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                &nbsp;
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                &nbsp;
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                &nbsp;
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                &nbsp;
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                &nbsp;
              </td>
              <td
                style={{ textAlign: "left", width: "0.3638in" }}
                className="Default"
              >
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </LayoutEspecialista>
    </Layout>
  );
};

export default modelo;
